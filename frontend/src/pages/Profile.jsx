import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaEdit, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || ''
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
        <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">Please Login</h1>
          <p className="text-gray-400 mb-6">You need to be logged in to view your profile.</p>
          <Link to="/login" className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to update profile
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#212121] py-8">
      <div className="container">
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-emerald-500">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">My Profile</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 text-center">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-4xl text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-gray-400 mb-4">{formData.email}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                  <FaLock className="text-emerald-500" />
                  <span>Account Verified</span>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full py-2 border border-[#424242] rounded-lg text-gray-300 hover:bg-[#3a3a3a] transition-colors"
                >
                  <FaEdit className="inline mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6">
                <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2 flex items-center gap-2">
                      <FaEnvelope /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2 flex items-center gap-2">
                      <FaPhone /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt /> Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="2"
                      placeholder="Enter your address"
                      className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-[#212121] border border-[#424242] rounded-xl text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-3 border border-[#424242] rounded-xl text-gray-300 hover:bg-[#3a3a3a] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
                      >
                        <FaSave /> Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

