import os
import django
import datetime
from django.utils import timezone
from django.db.models import Sum

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()

from your_app.models import AWSStation, StationData

def verify_today_rainfall(station_id):
    # Get station
    station = AWSStation.objects.get(station_id=station_id)
    today = timezone.now().date()
    
    # Get raw 15-minute data
    raw_data = (
        StationData.objects
        .filter(
            station=station,
            timestamp__date=today
        )
        .order_by('timestamp')
    )
    
    print(f"\nVerifying rainfall for station: {station.name}")
    print(f"Date: {today}")
    print("\nRaw 15-minute data:")
    total = 0
    for data in raw_data:
        print(f"Time: {data.timestamp}, Rainfall: {data.rainfall}mm")
        total += data.rainfall
    
    print(f"\nManual sum of 15-minute intervals: {total}mm")
    
    # Get daily sum from aggregation
    daily_sum = (
        StationData.objects
        .filter(
            station=station,
            timestamp__date=today
        )
        .aggregate(total=Sum('rainfall'))
    )['total'] or 0
    
    print(f"Daily sum from aggregation: {daily_sum}mm")
    print(f"Match: {'Yes' if abs(total - daily_sum) < 0.001 else 'No'}")

if __name__ == "__main__":
    # Replace with actual station ID
    STATION_ID = 1
    verify_today_rainfall(STATION_ID) 