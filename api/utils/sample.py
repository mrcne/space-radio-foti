from datetime import datetime, timedelta
from random import randint


def get_sample_spots(start_lat=-90.0, max_lat=90.0, start_long=-180.0, max_long=180.0, resolution=10.0):
    current_lat = start_lat
    current_long = start_long
    timestamp = datetime.now()

    result = []
    # loop until max_lat and max_long with specified resolution
    while current_lat < max_lat:
        while current_long < max_long:
            value = randint(1, 80)
            result.append({"lat": current_lat, "long": current_long, "timestamp": timestamp, "value": value})
            current_long += resolution
        current_lat += resolution
        current_long = start_long
    return result


# get a list of 20 timestamps separated by 2 hours
def get_sample_timestamps():
    result = []
    timestamp = datetime.now()
    for i in range(20):
        result.append(int(timestamp.timestamp()))
        timestamp = timestamp - timedelta(hours=2)
    return result
