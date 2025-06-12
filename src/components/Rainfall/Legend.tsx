import React, { useState, useEffect } from 'react';

const LEGEND = [
    { color: "bg-gray-400", label: "No Rain (0 mm)" },
    { color: "bg-green-300", label: "Light Rainfall (0.1 - 15.5 mm)" },
    { color: "bg-sky-400", label: "Moderate Rainfall (15.6 - 64.4 mm)" },
    { color: "bg-yellow-300", label: "Heavy Rainfall (64.5 - 115.5 mm)" },
    { color: "bg-orange-400", label: "Very Heavy Rainfall (115.6 - 204.4 mm)" },
    { color: "bg-red-500", label: "Extremely Heavy Rainfall (>= 204.5 mm)" }, // Make sure this is present!
  ];
  
  export default function Legend() {
    const [date, setDate] = useState<string>('');

    useEffect(() => {
      // Get tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      setDate(formattedDate);
    }, []);

    return (
      <div className="fixed bottom-6 left-180 z-30">
        <div className="
          relative
          lg:w-[290px] lg:h-[195px] lg:text-xs lg:p-4
          md:w-[220px] md:h-[145px] md:text-[11px] md:p-2
          w-[180px] h-[110px] text-[10px] p-1
          rounded-lg bg-black bg-opacity-90 backdrop-blur-[25px] text-white shadow-lg
        ">
          <div className="absolute inset-0 rounded-lg bg-black bg-opacity-90 pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="font-bold mb-1">
              Rainfall Forecast {date && <span className="text-red-500 text-base font-bold">({date})</span>}
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