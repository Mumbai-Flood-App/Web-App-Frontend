type RainfallPlotProps = {
    type: 'hourly' | 'daily' | 'third';
  };
  
  export default function RainfallPlot({ type }: RainfallPlotProps) {
    // You’ll replace this with your actual plot logic/component
    return (
      <div className="bg-black bg-opacity-80 rounded-lg p-4 h-[250px] flex flex-col justify-between">
        <div className="text-lg font-semibold mb-2">
          {type === 'hourly' && 'Observed Hourly Rainfall (Today)'}
          {type === 'daily' && 'Daily Rainfall Forecast'}
          {type === 'third' && 'Third Plot Title'}
        </div>
        {/* Placeholder for chart */}
        <div className="flex-1 flex items-center justify-center text-gray-400">
          [Plot goes here]
        </div>
        {/* Add axis labels, legends, etc. as needed */}
      </div>
    );
  }