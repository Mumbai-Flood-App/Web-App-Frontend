import requests
from datetime import datetime, timedelta
import pytz
from collections import defaultdict

def get_station_data(station_id):
    """Get station details"""
    url = f"https://api.mumbaiflood.in/aws/stations/{station_id}/"
    response = requests.get(url)
    return response.json()

def get_raw_data(station_id):
    """Get raw 15-minute interval data"""
    url = f"https://api.mumbaiflood.in/aws/stations/{station_id}/rawdata/"
    response = requests.get(url)
    return response.json()

def get_daily_data(station_id):
    """Get daily aggregated data (what frontend receives)"""
    url = f"https://api.mumbaiflood.in/aws/stations/{station_id}/"
    response = requests.get(url)
    return response.json()

def analyze_rainfall_data(station_id):
    # Get station info
    station_data = get_station_data(station_id)
    station_name = station_data.get('station', {}).get('name', 'Unknown Station')
    print(f"\nAnalyzing data for station: {station_name} (ID: {station_id})")
    
    # Get raw data
    raw_data = get_raw_data(station_id)
    
    # Get daily data (what frontend receives)
    daily_data_response = get_daily_data(station_id)
    daily_data = daily_data_response.get('daily_data', [])
    
    # Group raw data by date
    raw_daily_data = defaultdict(list)
    ist = pytz.timezone('Asia/Kolkata')
    
    for record in raw_data:
        # Convert timestamp to IST
        timestamp = datetime.fromisoformat(record['timestamp'].replace('Z', '+00:00'))
        timestamp_ist = timestamp.astimezone(ist)
        date_str = timestamp_ist.strftime('%Y-%m-%d')
        
        raw_daily_data[date_str].append({
            'timestamp': timestamp_ist,
            'rainfall': record['rainfall']
        })
    
    # Analyze each day's data
    print("\n=== Raw Data Analysis ===")
    for date_str in sorted(raw_daily_data.keys()):
        day_data = raw_daily_data[date_str]
        total_rainfall = sum(record['rainfall'] for record in day_data)
        
        print(f"\n=== {date_str} ===")
        print(f"Number of 15-minute intervals: {len(day_data)}")
        print(f"Total rainfall from raw data: {total_rainfall:.2f}mm")
        
        # Print first and last record of the day
        if day_data:
            first_record = min(day_data, key=lambda x: x['timestamp'])
            last_record = max(day_data, key=lambda x: x['timestamp'])
            print(f"First record: {first_record['timestamp'].strftime('%H:%M')} - {first_record['rainfall']}mm")
            print(f"Last record: {last_record['timestamp'].strftime('%H:%M')} - {last_record['rainfall']}mm")
    
    # Compare with daily data endpoint
    print("\n=== Daily Data Endpoint Analysis ===")
    for data in daily_data:
        if not data.get('is_forecasted'):
            print(f"\nDate: {data['date']}")
            print(f"Observed rainfall from daily endpoint: {data['observed']:.2f}mm")
            print(f"Predicted rainfall: {data['predicted']:.2f}mm")
            
            # Find corresponding raw data
            raw_date = datetime.fromisoformat(data['date']).strftime('%Y-%m-%d')
            if raw_date in raw_daily_data:
                raw_total = sum(record['rainfall'] for record in raw_daily_data[raw_date])
                print(f"Raw data total for this date: {raw_total:.2f}mm")
                print(f"Difference: {abs(raw_total - data['observed']):.2f}mm")

if __name__ == "__main__":
    # Test with a specific station ID
    STATION_ID = 22  # S Ward station
    analyze_rainfall_data(STATION_ID) 