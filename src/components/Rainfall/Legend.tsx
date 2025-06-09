const LEGEND = [
    { color: "bg-gray-400", label: "No Rain (0 mm)" },
    { color: "bg-green-300", label: "Light Rainfall (0.1 - 15.5 mm)" },
    { color: "bg-sky-400", label: "Moderate Rainfall (15.6 - 64.4 mm)" },
    { color: "bg-yellow-300", label: "Heavy Rainfall (64.5 - 115.5 mm)" },
    { color: "bg-orange-400", label: "Very Heavy Rainfall (115.6 - 204.4 mm)" },
    { color: "bg-red-500", label: "Extremely Heavy Rainfall (>= 204.5 mm)" }, // Make sure this is present!
  ];
  
  export default function Legend() {
    return (
      <div className="fixed bottom-6 left-180 z-30">
        <div className="relative w-[290px] h-[170px] rounded-lg bg-black bg-opacity-90 backdrop-blur-[25px] p-4 text-xs text-white shadow-lg">
          <div className="absolute inset-0 rounded-lg bg-black bg-opacity-90 pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-2">
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