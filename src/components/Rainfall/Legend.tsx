import React, { useState, useEffect } from 'react';

const LEGEND = [
    { color: "bg-gray-400", label: "No Rain (0 mm)" },
    { color: "bg-green-300", label: "Light Rainfall (0.1 - 15.5 mm)" },
    { color: "bg-sky-400", label: "Moderate Rainfall (15.6 - 64.4 mm)" },
    { color: "bg-yellow-300", label: "Heavy Rainfall (64.5 - 115.5 mm)" },
    { color: "bg-orange-400", label: "Very Heavy Rainfall (115.6 - 204.4 mm)" },
    { color: "bg-red-500", label: "Extremely Heavy Rainfall (>= 204.5 mm)" },
  ];
  
export default function Legend({ mobile = false }: { mobile?: boolean }) {
  const [date, setDate] = useState<string>('Loading...');

  useEffect(() => {
    // Fetch the latest predictions from the backend database
    fetch('/api/proxy-latest-three-predictions?station=22')
      .then(res => res.json())
      .then(data => {
        if (data && data.length >= 3) {
          // Get the latest prediction (last in the array since it's ordered by timestamp ASC)
          const latestPrediction = data[data.length - 1]; // Use the last element
          console.log('Latest prediction:', latestPrediction);
          
          // Parse the timestamp and extract just the date part
          const timestampStr = latestPrediction.timestamp; // "2025-06-20T18:21:00+05:30"
          console.log('Timestamp string:', timestampStr);
          const datePart = timestampStr.split('T')[0]; // "2025-06-20"
          console.log('Date part:', datePart);
          const [year, month, day] = datePart.split('-').map(Number);
          console.log('Year, month, day:', year, month, day);
          
          // Create a date object - day1_rainfall is for the NEXT day after the timestamp
          const predictionDate = new Date(year, month - 1, day);
          console.log('Prediction date:', predictionDate);
          const forecastDate = new Date(predictionDate.getTime() + 24 * 60 * 60 * 1000);
          console.log('Forecast date:', forecastDate);
          
          const formattedDate = forecastDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
          console.log('Formatted date:', formattedDate);
          setDate(formattedDate);
        } else {
          setDate('Date not available');
        }
      })
      .catch(() => {
        setDate('Error loading date');
      });
  }, []);

  return (
    <div className={mobile ? "absolute bottom-3 left-0 right-0 z-50 flex justify-end pointer-events-auto" : "fixed bottom-0 right-0 z-30"}>
      <div className={mobile ? "w-full max-w-[215px] mr-2 h-auto text-[10px] p-1 rounded-lg bg-black bg-opacity-90 backdrop-blur-[25px] text-white shadow-2xl" : `
        relative
        lg:w-[290px] lg:h-[195px] lg:text-xs lg:p-4
        md:w-[220px] md:h-[145px] md:text-[11px] md:p-2
        w-[180px] h-[110px] text-[10px] p-1
        rounded-tl-lg bg-black bg-opacity-90 backdrop-blur-[25px] text-white shadow-lg
      `}>
        <div className="absolute inset-0 rounded-tl-lg bg-black bg-opacity-90 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="font-bold mb-1">
            Rainfall Forecast {date && (
              <span className={mobile ? "text-red-500 text-xs font-bold" : "text-red-500 text-base font-bold"}>
                ({date})
              </span>
            )}
          </div>
          {LEGEND.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`inline-block w-4 h-4 rounded-full border border-white ${item.color}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}