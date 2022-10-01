from datetime import datetime
from random import randint

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Space Apps!"}


@app.get("/sample/spots")
async def say_hello():
    current_lat = 43.51095343289946
    initial_long = current_long = 0.3216334542913657
    max_lat = 58.14334491675913
    max_long = 26.819192405669234
    timestamp = datetime.now()

    resolution = 5

    result = []
    # loop until max_lat and max_long with specified resolution
    while current_lat < max_lat:
        while current_long < max_long:
            value = randint(1, 80)
            result.append({"lat": current_lat, "long": current_long, "timestamp": timestamp, "value": value})
            current_long += resolution
        current_lat += resolution
        current_long = initial_long
    return result
