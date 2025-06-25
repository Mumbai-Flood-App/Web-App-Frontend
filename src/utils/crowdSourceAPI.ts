export interface FormData {
  name: string;
  feet: number;
  inch: number;
  location: string;
  latitude: number | null;
  longitude: number | null;
  feedback: string;
}

export interface Coords {
  lat: number;
  long: number;
}

interface ApiResponse {
  message: string;
  [key: string]: unknown;
}

export async function sendFormData(formData: FormData): Promise<ApiResponse> {
  const res = await fetch('https://api.mumbaiflood.in/cs/data/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Error storing data');
  return res.json();
}

export async function fetchCrowdData(): Promise<ApiResponse> {
  const res = await fetch('https://api.mumbaiflood.in/cs/map/');
  if (!res.ok) throw new Error('Error fetching map data');
  return res.json();
}

export async function fetchLocationData(coords: Coords): Promise<string> {
  const res = await fetch('https://api.mumbaiflood.in/cs/location/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coords),
  });
  if (!res.ok) throw new Error('Error fetching location data');
  const data = await res.json();
  return data.location;
} 