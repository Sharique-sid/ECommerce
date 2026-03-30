import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMapMarkerAlt, FaLock, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useDeliveryLocation } from '../context/DeliveryLocationContext';
import { orderApi } from '../api/client';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { location } = useDeliveryLocation();
  const [step, setStep] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isVerifyingPincode, setIsVerifyingPincode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
    paymentMethod: 'CARD', cardNumber: '', cardName: '', expiry: '', cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const estimatedDeliveryDate = useMemo(() => {
    const pin = String(formData.pincode || '').trim();
    let leadDays = 5;

    if (/^[1-4]/.test(pin)) {
      leadDays = 3;
    } else if (/^[5-8]/.test(pin)) {
      leadDays = 4;
    }

    const d = new Date();
    d.setDate(d.getDate() + leadDays);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [formData.pincode]);

  const luhnCheck = (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i -= 1) {
      let digit = Number(digits[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return digits.length >= 13 && digits.length <= 19 && sum % 10 === 0;
  };

  const verifyPincodeWithCity = async (pincode, city) => {
    try {
      setIsVerifyingPincode(true);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      const first = Array.isArray(data) ? data[0] : null;
      const offices = first?.PostOffice || [];
      if (!offices.length) {
        return { ok: false, message: 'Invalid pincode. Please enter a valid one.' };
      }

      const normalizedCity = city.trim().toLowerCase();
      const matches = offices.some((office) => {
        const candidates = [
          office?.District,
          office?.Division,
          office?.Block,
          office?.Name,
          office?.State,
        ]
          .filter(Boolean)
          .map((value) => String(value).trim().toLowerCase());

        return candidates.some(
          (candidate) =>
            candidate === normalizedCity ||
            candidate.includes(normalizedCity) ||
            normalizedCity.includes(candidate)
        );
      });

      if (!matches) {
        return {
          ok: false,
          message: 'Entered city does not match this pincode. Please correct city/pincode.',
        };
      }

      return { ok: true, message: 'Pincode verified for the entered city.' };
    } catch (error) {
      return {
        ok: false,
        message: 'Could not verify pincode right now. Please check internet and try again.',
      };
    } finally {
      setIsVerifyingPincode(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        toast.error('Please fill all contact details');
        return false;
      }
    }

    if (step === 2) {
      if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.pincode.trim()) {
        toast.error('Please complete the shipping address');
        return false;
      }

      if (!/^\d{6}$/.test(formData.pincode.trim())) {
        toast.error('Please enter a valid 6-digit pincode');
        return false;
      }
    }

    if (step === 3) {
      if (formData.paymentMethod === 'CARD') {
        if (!formData.cardNumber.trim() || !formData.cardName.trim() || !formData.expiry.trim() || !formData.cvv.trim()) {
          toast.error('Please fill card details');
          return false;
        }

        if (!luhnCheck(formData.cardNumber)) {
          toast.error('Please enter a valid card number');
          return false;
        }

        if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(formData.expiry.trim())) {
          toast.error('Expiry should be in MM/YY format');
          return false;
        }

        if (!/^\d{3,4}$/.test(formData.cvv.trim())) {
          toast.error('Please enter a valid CVV');
          return false;
        }
      }

      if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !/^\d{6}$/.test(formData.pincode.trim())) {
        toast.error('Shipping address is invalid. Go back and update it.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) {
      return;
    }

    if (step < 3) {
      if (step === 2) {
        const verification = await verifyPincodeWithCity(formData.pincode.trim(), formData.city.trim());
        if (!verification.ok) {
          toast.error(verification.message);
          return;
        }
        toast.success(verification.message);
      }
      setStep(step + 1);
    } else {
      try {
        setIsPlacingOrder(true);

        const shippingAddress = `${formData.address.trim()}, ${formData.city.trim()}, ${formData.state.trim()} - ${formData.pincode.trim()}`;
        const resolvedLabel = location?.label && location.label !== 'Set your location'
          ? location.label
          : `Deliver to ${formData.city.trim()}`;

        const subtotal = Number(cartTotal);
        const tax = Math.round(subtotal * 0.18);
        const total = Math.round(subtotal + tax);

        const orderPayload = {
          totalAmount: total,
          taxAmount: tax,
          shippingCost: 0,
          shippingAddress,
          paymentMethod: formData.paymentMethod,
        };

        const response = await orderApi.createOrder(orderPayload);
        const createdOrder = response.data;

        if (createdOrder?.id) {
          await Promise.all(
            cartItems.map((item) => orderApi.addItemToOrder(createdOrder.id, item.id, item.quantity))
          );
        }

        const successData = {
          orderNumber: createdOrder?.orderNumber || null,
          deliveryAddress: shippingAddress,
          deliveryLabel: resolvedLabel,
          expectedDeliveryDate: estimatedDeliveryDate,
        };

        localStorage.setItem('lastOrder', JSON.stringify(successData));
        clearCart();
        navigate('/order-success', { state: successData });
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          toast.error('Please login to place your order');
          navigate('/login');
          return;
        }

        const message = error?.response?.data?.message || 'Failed to place order. Please try again.';
        toast.error(message);
      } finally {
        setIsPlacingOrder(false);
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#212121] py-8">
        <div className="container text-center py-16">
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link to="/products" className="text-emerald-500 hover:text-emerald-400">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/cart" className="hover:text-emerald-500">Cart</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Checkout</span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[
            { num: 1, label: 'Shipping', icon: FaTruck },
            { num: 2, label: 'Address', icon: FaMapMarkerAlt },
            { num: 3, label: 'Payment', icon: FaCreditCard }
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= s.num ? 'bg-emerald-500 text-white' : 'bg-[#2f2f2f] text-gray-500 border border-[#424242]'}`}>
                  {step > s.num ? <FaCheckCircle /> : <s.icon />}
                </div>
                <span className={`mt-2 text-sm ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>{s.label}</span>
              </div>
              {i < 2 && <div className={`w-24 h-1 mx-2 rounded ${step > s.num ? 'bg-emerald-500' : 'bg-[#424242]'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaTruck className="text-emerald-500" /> Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-500" /> Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Address</label>
                      <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">PIN Code</label>
                      <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FaCreditCard className="text-emerald-500" /> Payment Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Select Payment Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className="flex items-center gap-2 px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="CARD"
                            checked={formData.paymentMethod === 'CARD'}
                            onChange={handleChange}
                          />
                          <span>Card Payment</span>
                        </label>
                        <label className="flex items-center gap-2 px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            checked={formData.paymentMethod === 'COD'}
                            onChange={handleChange}
                          />
                          <span>Cash on Delivery</span>
                        </label>
                      </div>
                    </div>

                    {formData.paymentMethod === 'CARD' && (
                      <>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Card Number</label>
                          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" required />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">Name on Card</label>
                          <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white focus:outline-none focus:border-emerald-500" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">Expiry Date</label>
                            <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" required />
                          </div>
                          <div>
                            <label className="block text-gray-300 text-sm mb-2">CVV</label>
                            <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" className="w-full px-4 py-3 bg-[#3a3a3a] border border-[#424242] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500" required />
                          </div>
                        </div>
                      </>
                    )}

                    {formData.paymentMethod === 'COD' && (
                      <p className="text-sm text-gray-300 bg-[#3a3a3a] border border-[#424242] rounded-xl px-4 py-3">
                        You will pay in cash when your order is delivered.
                      </p>
                    )}
                  </div>
                  {formData.paymentMethod === 'CARD' && (
                    <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
                      <FaLock className="text-emerald-500" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border border-[#424242] rounded-xl text-gray-300 hover:bg-[#3a3a3a] transition-colors">
                    Back
                  </button>
                )}
                <button type="submit" disabled={isPlacingOrder} className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                  {step === 3 ? (isPlacingOrder ? 'Placing Order...' : 'Place Order') : 'Continue'}
                </button>
              </div>
              {step === 2 && isVerifyingPincode && (
                <p className="mt-4 text-sm text-gray-400">Verifying city and pincode...</p>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.imageUrl || 'https://via.placeholder.com/60x60'} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm text-white line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm text-white">₹{(Number(item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t border-[#424242]">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-500">FREE</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (18%)</span>
                  <span>₹{Math.round(cartTotal * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-[#424242]">
                  <span>Total</span>
                  <span>₹{Math.round(cartTotal * 1.18).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
