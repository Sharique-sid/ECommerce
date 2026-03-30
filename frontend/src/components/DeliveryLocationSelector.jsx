import React, { useMemo, useState } from 'react';
import { FaCrosshairs, FaMapMarkedAlt, FaMapMarkerAlt, FaSearchLocation } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDeliveryLocation } from '../context/DeliveryLocationContext';

export default function DeliveryLocationSelector({ isOpen, onClose }) {
  const { location, checkPincode, setFromPincode, setFromCoords } = useDeliveryLocation();
  const [mode, setMode] = useState('gps');
  const [isLoadingGps, setIsLoadingGps] = useState(false);
  const [pincode, setPincode] = useState(location?.pincode || '');
  const [status, setStatus] = useState('');

  const mapUrl = useMemo(() => {
    if (!location?.coords?.lat || !location?.coords?.lon) {
      return '';
    }

    const { lat, lon } = location.coords;
    const bbox = `${lon - 0.015}%2C${lat - 0.015}%2C${lon + 0.015}%2C${lat + 0.015}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  }, [location]);

  if (!isOpen) {
    return null;
  }

  const handleUseLiveLocation = async () => {
    try {
      setIsLoadingGps(true);
      await setFromCoords();
      setStatus('Location detected successfully.');
    } catch (error) {
      const fallback = 'Unable to capture your location. Please allow location access.';
      setStatus(error?.message || fallback);
      toast.error(error?.message || fallback);
    } finally {
      setIsLoadingGps(false);
    }
  };

  const handlePincodeCheck = () => {
    const result = checkPincode(pincode);
    setStatus(result.message);
    if (result.ok && result.serviceable) {
      setFromPincode(pincode);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Close delivery location selector"
      />

      <div className="relative w-full max-w-2xl rounded-2xl border border-[#3a3a3a] bg-[#1e1e1e] p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Choose Delivery Location</h3>
            <p className="text-sm text-gray-400">Use live map location or check with pincode.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-[#3a3a3a] px-3 py-1 text-sm text-gray-300 hover:bg-[#2d2d2d]"
          >
            Close
          </button>
        </div>

        <div className="mb-4 flex gap-2 rounded-xl bg-[#262626] p-1">
          <button
            onClick={() => setMode('gps')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              mode === 'gps' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-[#323232]'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <FaMapMarkedAlt /> Live From Map
            </span>
          </button>
          <button
            onClick={() => setMode('pincode')}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
              mode === 'pincode' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-[#323232]'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <FaSearchLocation /> Check by Pincode
            </span>
          </button>
        </div>

        {mode === 'gps' && (
          <div className="space-y-4">
            <button
              onClick={handleUseLiveLocation}
              disabled={isLoadingGps}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaCrosshairs />
              {isLoadingGps ? 'Detecting...' : 'Use Current Live Location'}
            </button>

            {mapUrl && (
              <div className="overflow-hidden rounded-xl border border-[#3a3a3a]">
                <iframe
                  title="Current location map preview"
                  src={mapUrl}
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            )}

            <p className="text-sm text-gray-300">
              <span className="text-emerald-400">Selected:</span> {location?.label || 'Not set'}
            </p>
          </div>
        )}

        {mode === 'pincode' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="delivery-pincode" className="mb-1 block text-sm text-gray-300">
                Enter 6-digit pincode
              </label>
              <input
                id="delivery-pincode"
                type="text"
                value={pincode}
                maxLength={6}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="w-full rounded-lg border border-[#3a3a3a] bg-[#262626] px-3 py-2 text-white outline-none focus:border-emerald-500"
                placeholder="e.g. 110001"
              />
            </div>

            <button
              onClick={handlePincodeCheck}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              <FaMapMarkerAlt /> Check Delivery Availability
            </button>

            <p className="text-sm text-gray-300">
              <span className="text-emerald-400">Selected:</span> {location?.label || 'Not set'}
            </p>
          </div>
        )}

        {status && <p className="mt-4 text-sm text-gray-300">{status}</p>}
      </div>
    </div>
  );
}
