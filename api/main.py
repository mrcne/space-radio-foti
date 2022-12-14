from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from resolver.db import get_iss_values, get_ham_values, get_model_values
from utils.sample import get_sample_spots, get_sample_timestamps

app = FastAPI()

origins = [
    "http://mrcne.github.io",
    "https://mrcne.github.io",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Space Apps!"}


@app.get("/model/tec")
async def model_tec(timestamp: int = None, sample: bool = False):
    if sample:
        return get_sample_spots()

    return get_model_values()



@app.get("/model/timestamps")
async def model_tec(sample: bool = False):
    return get_sample_timestamps()


@app.get("/iss/tec")
async def model_tec(timestamp: int = None, sample: bool = False):
    if sample:
        return get_sample_spots()

    return get_iss_values()


@app.get("/iss/timestamps")
async def model_tec(sample: bool = False):
    return get_sample_timestamps()


@app.get("/ham/tec")
async def model_tec(timestamp: int = None, sample: bool = False):
    if sample:
        return get_sample_spots()

    return get_ham_values()


@app.get("/ham/timestamps")
async def model_tec(sample: bool = False):
    return get_sample_timestamps()


@app.get("/sample/spots")
async def sample_spots(timestamp: int = None, sample: bool = False):
    return get_sample_spots()


@app.get("/sample/spots_eu")
async def sample_spots_eu():
    return get_sample_spots(43.51095343289946, 58.14334491675913, 0.3216334542913657, 26.819192405669234, 5)
