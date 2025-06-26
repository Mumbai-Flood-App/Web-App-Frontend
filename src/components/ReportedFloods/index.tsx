'use client';
import React, { useState, useEffect } from 'react';
import { fetchLocationData, sendFormData } from '../../utils/crowdSourceAPI';
import dynamic from 'next/dynamic';

interface FormProps {
  setCsPinDropLocation?: (loc: { lat: number; long: number } | null) => void;
  csPinDropLocation?: { lat: number; long: number };
  setCsPinToggle?: (val: boolean) => void;
  csPinToggle?: boolean;
  setZoomToLocation?: (loc: { lat: number; long: number; feet: number; inch: number }) => void;
}

const DynamicMapPicker = dynamic(() => import('./MapPinPicker'), { ssr: false });

const ReportedFloods: React.FC<FormProps> = ({
  setCsPinDropLocation,
  csPinDropLocation,
  setCsPinToggle,
  csPinToggle,
  setZoomToLocation,
}) => {
  const [name, setName] = useState('');
  const [feet, setFeet] = useState<number | null>(null);
  const [inches, setInches] = useState<number | null>(null);
  const [waterlevelfactor, setWaterlevelfactor] = useState(0);
  const [location, setLocation] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [activeOption, setActiveOption] = useState(0);
  const [gpslocation, setGpsLocation] = useState<{ lat: number; long: number } | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      setMessage('Please enter your name!!!');
      return;
    }
    if (waterlevelfactor === 0) {
      setMessage('Please select water level!!!');
      return;
    }
    if (feet === null || inches === null) {
      setMessage('Please enter your height!!!');
      return;
    }
    if (!location) {
      setMessage('Please enter location!!!');
      return;
    }

    const ajustedwaterlevel = feet * 12 * waterlevelfactor + inches * waterlevelfactor;
    const adjusted_feet = Math.floor(ajustedwaterlevel / 12);
    const adjusted_inches = ajustedwaterlevel % 12;

    let data: {
      latitude: number | null;
      longitude: number | null;
      feet: number;
      inch: number;
    } = {
      latitude: null,
      longitude: null,
      feet: adjusted_feet,
      inch: adjusted_inches,
    };

    if (gpslocation) {
      data = { ...data, latitude: gpslocation.lat, longitude: gpslocation.long };
    }
    if (csPinToggle && csPinDropLocation) {
      data = { ...data, latitude: csPinDropLocation.lat, longitude: csPinDropLocation.long };
    }

    sendData(data);
  };

  const sendData = async (data: {
    latitude: number | null;
    longitude: number | null;
    feet: number;
    inch: number;
  }) => {
    const sendata = {
      name: name,
      feet: data.feet,
      inch: data.inch,
      location: location,
      latitude: data.latitude,
      longitude: data.longitude,
      feedback: feedback,
    };

    try {
      const response = await sendFormData(sendata);
      if (response.message === 'Data stored successfully') {
        setFeet(null);
        setInches(null);
        setWaterlevelfactor(0);
        setLocation('');
        setFeedback('');
        setZoomToLocation?.({
          lat: data.latitude || 0,
          long: data.longitude || 0,
          feet: data.feet,
          inch: data.inch,
        });
        setCsPinToggle?.(false);
        setCsPinDropLocation?.(null);
        window.alert(
          'Thank you for your submission. Your data has been recorded successfully. You can view your submission on the map.'
        );
      }
    } catch {
      setMessage('Error: Unable to store data.');
    }
  };

  const handleOption = (value: number, option: number) => () => {
    setWaterlevelfactor(value);
    setActiveOption(option);
  };

  const getgps = () => {
    if (!csPinToggle) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          try {
            const curr_location = await fetchLocationData({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
            setLocation(curr_location);
            setGpsLocation({ lat: position.coords.latitude, long: position.coords.longitude });
          } catch {
            // ignore
          }
        },
        () => {
          // ignore
        }
      );
    }
  };

  useEffect(() => {
    if (csPinToggle && csPinDropLocation) {
      (async () => {
        try {
          const curr_location = await fetchLocationData({
            lat: csPinDropLocation.lat,
            long: csPinDropLocation.long,
          });
          setLocation(curr_location);
        } catch {
          // ignore
        }
      })();
    }
  }, [csPinToggle, csPinDropLocation]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl md:max-w-2xl bg-black/80 backdrop-blur-[25px] rounded-lg text-white shadow-lg border border-gray-700 px-4 md:px-8 py-6 md:py-10 flex flex-col gap-3 max-h-[90vh] overflow-auto"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#326afd] mb-1">Submit Data</h1>

        <button
          type="button"
          onClick={getgps}
          className="w-full bg-black/80 border border-gray-700 hover:bg-black/90 text-white font-semibold py-2 md:py-3 rounded-lg text-base md:text-lg mb-2 shadow transition-colors cursor-pointer"
          disabled={!!gpslocation}
        >
          Use my current location
        </button>
        <button
          type="button"
          onClick={() => setShowMapModal(true)}
          className="w-full bg-black/80 border border-gray-700 hover:bg-black/90 text-white font-semibold py-2 md:py-3 rounded-lg text-base md:text-lg mb-2 shadow transition-colors cursor-pointer"
          disabled={!!gpslocation}
        >
          Select location from map
        </button>

        <label className="text-white text-base font-medium mt-2 mb-1">Height:</label>
        <div className="flex gap-2 w-full bg-gray-900/90 border border-gray-600 rounded-lg px-2 py-2 mb-2">
          <div className="relative flex-1">
            <select
              id="height-feet"
              name="height-feet"
              value={feet ?? ''}
              onChange={e => setFeet(Number(e.target.value))}
              className="w-full text-base px-3 py-2 rounded-lg border-none focus:ring-0 focus:outline-none bg-gray-900/90 text-gray-100 placeholder-gray-400 focus:border-blue-500 transition-colors shadow-sm appearance-none pr-8 cursor-pointer"
            >
              <option value="">In Feet</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
          <div className="relative flex-1">
            <select
              id="height-inches"
              name="height-inches"
              value={inches ?? ''}
              onChange={e => setInches(Number(e.target.value))}
              className="w-full text-base px-3 py-2 rounded-lg border-none focus:ring-0 focus:outline-none bg-gray-900/90 text-gray-100 placeholder-gray-400 focus:border-blue-500 transition-colors shadow-sm appearance-none pr-8 cursor-pointer"
            >
              <option value="">In Inches</option>
              {[...Array(12).keys()].map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>

        <label className="text-white text-base font-medium mt-2 mb-1">Water Level (choose one):</label>
        <div className="flex flex-wrap justify-between items-end w-full mb-2 gap-2">
          {[0.2, 0.4, 0.6, 0.9].map((factor, idx) => (
            <button
              type="button"
              key={factor}
              onClick={handleOption(factor, idx + 1)}
              className={`flex flex-col items-center flex-1 min-w-[60px] mx-1 rounded-lg border-2 transition-all duration-150 py-1 px-0 bg-gray-900/90 text-white ${activeOption === idx + 1 ? 'border-[#326afd] bg-blue-900/60' : 'border-gray-600 hover:border-blue-500'} shadow cursor-pointer`}
            >
              <img src={`/img/${idx + 1}.png`} width={60} height={60} alt="Water level" />
              <span className="text-white text-sm font-medium mt-1">
                {['Ankle', 'Knee', 'Waist', 'Neck & above'][idx]}
              </span>
            </button>
          ))}
        </div>

        <label htmlFor="location" className="text-white text-base font-medium mt-2 mb-1">Location:</label>
        <input
          type="text"
          id="location"
          placeholder="Location"
          name="location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className="w-full border border-gray-600 rounded-lg px-3 py-2 text-base bg-gray-900/90 text-white placeholder-gray-400 mb-2 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
        />

        <label htmlFor="description" className="text-white text-base font-medium mt-2 mb-1">Feedback:</label>
        <textarea
          id="description"
          placeholder="Enter your feedback (optional)"
          name="description"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          className="w-full border border-gray-600 rounded-lg px-3 py-2 text-base bg-gray-900/90 text-white placeholder-gray-400 mb-2 focus:outline-none focus:border-blue-500 transition-colors shadow-sm resize-y"
          rows={4}
        ></textarea>

        <label htmlFor="name" className="text-white text-base font-medium mt-2 mb-1">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your Name (optional)"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-600 rounded-lg px-3 py-2 text-base bg-gray-900/90 text-white placeholder-gray-400 mb-2 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
        />

        <button
          type="submit"
          className="w-full bg-[#326afd] hover:bg-[#1746a2] text-white font-bold py-2 rounded-lg text-base mt-2 shadow transition-colors cursor-pointer"
        >
          Submit
        </button>
        <div className="mt-2 text-center text-red-400 min-h-[1.5rem]">{message}</div>
      </form>

      {showMapModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-black/90 rounded-lg shadow-lg p-2 w-[90vw] max-w-xl h-[60vh] flex flex-col items-center justify-center">
            <button
              className="z-[1100] absolute top-3 right-3 text-white bg-gray-900 border-2 border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 hover:border-blue-400 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowMapModal(false)}
              aria-label="Close map picker"
              style={{ fontSize: 24 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <DynamicMapPicker
              onSelect={(latlng, address) => {
                setLocation(address || `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`);
                setShowMapModal(false);
              }}
            />
            <div className="mt-2 text-xs text-gray-300">Click on the map to select your location</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedFloods;