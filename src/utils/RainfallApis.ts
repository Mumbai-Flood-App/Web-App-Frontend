interface Station {
  id: number;
  station_id: number;
  name: string;
  latitude: number;
  longitude: number;
  rainfall: number;
}

interface HourlyAWSData {
  timestamp: string;
  rainfall: number;
}

export const fetchStations = async (): Promise<Station[]> => {
  try {
    const response = await fetch('/api/proxy-stations');
    if (!response.ok) {
      throw new Error('Failed to fetch stations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
};

export const fetchStationData = async (stationId: number) => {
  try {
    const response = await fetch(`/api/proxy-station-data/${stationId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch station data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching station data:', error);
    throw error;
  }
};

export const fetchObservedRainfall = async (stationId: number) => {
  try {
    const response = await fetch(`/api/proxy-rawdata/${stationId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch observed rainfall data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching observed rainfall data:', error);
    throw error;
  }
};

export const fetchHourlyAWSData = async (stationId: number): Promise<HourlyAWSData[]> => {
  try {
    const response = await fetch(`/api/proxy-hourly-aws-data/${stationId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch hourly AWS data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hourly AWS data:', error);
    throw error;
  }
};




