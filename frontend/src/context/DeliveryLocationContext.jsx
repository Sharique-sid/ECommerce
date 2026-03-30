import React, { createContext, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const STORAGE_KEY = 'deliveryLocation';

const DeliveryLocationContext = createContext();

function getInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        label: 'Set your location',
        pincode: '',
        coords: null,
        source: null,
      };
    }
    return JSON.parse(raw);
  } catch (error) {
    return {
      label: 'Set your location',
      pincode: '',
      coords: null,
      source: null,
    };
  }
}

export function DeliveryLocationProvider({ children }) {
  const [location, setLocation] = useState(getInitialState);

  const persistLocation = (next) => {
    setLocation(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const checkPincode = (pincode) => {
    const cleaned = String(pincode || '').trim();

    if (!/^\d{6}$/.test(cleaned)) {
      return {
        ok: false,
        serviceable: false,
        message: 'Enter a valid 6-digit pincode',
      };
    }

    // Basic delivery coverage check for demo usage.
    const serviceable = /^[1-8]/.test(cleaned);

    if (!serviceable) {
      return {
        ok: true,
        serviceable: false,
        message: 'Sorry, delivery is currently unavailable for this pincode',
      };
    }

    return {
      ok: true,
      serviceable: true,
      message: 'Great! Delivery is available in your area',
    };
  };

  const setFromPincode = (pincode) => {
    const result = checkPincode(pincode);

    if (!result.ok || !result.serviceable) {
      toast.error(result.message);
      return result;
    }

    const next = {
      label: `Deliver to ${pincode}`,
      pincode,
      coords: null,
      source: 'pincode',
    };

    persistLocation(next);
    toast.success('Delivery location updated');
    return result;
  };

  const setFromCoords = async () => {
    if (!navigator.geolocation) {
      const message = 'Geolocation is not supported in this browser';
      toast.error(message);
      throw new Error(message);
    }

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    let label = 'Deliver to your current location';

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const address = data?.address || {};
      const city = address.city || address.town || address.village || address.state_district || '';
      const state = address.state || '';
      const country = address.country || '';
      const segments = [city, state, country].filter(Boolean);
      if (segments.length) {
        label = `Deliver to ${segments.join(', ')}`;
      }
    } catch (error) {
      // Keep generic label if reverse geocoding fails.
    }

    const next = {
      label,
      pincode: '',
      coords: { lat, lon },
      source: 'gps',
    };

    persistLocation(next);
    toast.success('Live location captured');
    return next;
  };

  const value = useMemo(
    () => ({
      location,
      checkPincode,
      setFromPincode,
      setFromCoords,
    }),
    [location]
  );

  return (
    <DeliveryLocationContext.Provider value={value}>
      {children}
    </DeliveryLocationContext.Provider>
  );
}

export function useDeliveryLocation() {
  const context = useContext(DeliveryLocationContext);
  if (!context) {
    throw new Error('useDeliveryLocation must be used within a DeliveryLocationProvider');
  }
  return context;
}
