import { useEffect, useState, useRef } from 'react';
import { fetchSensorList } from '../../utils/WaterLevelApis';
import type { WaterLevelStation } from '../../contexts/WaterLevelStationContext';

interface Props {
  selected?: WaterLevelStation | null;
  onChange?: (station: WaterLevelStation) => void;
}

export default function WaterLevelStationSelector({ selected, onChange }: Props) {
  const [stations, setStations] = useState<WaterLevelStation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSensorList()
      .then((data) => {
        setStations(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selected) {
      const match = stations.find(s => s.id === selected.id || s.name === selected.name);
      setSearchTerm(match ? match.name : selected.name);
    } else {
      setSearchTerm('');
    }
  }, [selected, stations]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOptions(false);
        if (selected) {
          setSearchTerm(selected.name);
        } else {
          setSearchTerm('');
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selected]);

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectStation = (station: WaterLevelStation) => {
    setSearchTerm(station.name);
    setShowOptions(false);
    onChange?.(station);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowOptions(true);
  };

  const toggleDropdown = () => {
    setShowOptions(!showOptions);
    if (!showOptions) {
      setSearchTerm('');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-900/90 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="relative">
        <input
          type="text"
          className="w-full h-full bg-gray-900/90 border border-gray-600 rounded-lg px-3 py-1 text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowOptions(true)}
          placeholder={selected ? selected.name : 'Select Station'}
          style={{ fontSize: 16 }}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
          onClick={toggleDropdown}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      {showOptions && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-gray-900/95 border border-gray-600 rounded-lg shadow-lg z-50">
          {filteredStations.length > 0 ? (
            filteredStations.map((station) => (
              <button
                key={station.id}
                type="button"
                onClick={() => selectStation(station)}
                className="w-full px-3 py-2 text-left text-gray-200 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors"
              >
                <div className="text-sm">{station.name}</div>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400 text-sm">No stations found</div>
          )}
        </div>
      )}
    </div>
  );
} 