# Radio Foti

## Introduction

Web Application which prepares and displays electron density from an API on a 2D globe.

This project started as [NASA Space Apps](https://www.spaceappschallenge.org/) hackathon [Calling All Radio Enthusiasts!](https://2022.spaceappschallenge.org/challenges/2022-challenges/radio-enthusiasts) challenge.

The aim of the “Calling All Radio Enthusiasts” challenge is to make use of observations from ground based HAM network and space based ISS broadcasts. The data ingestion of these both could possibly provide a good solution in the prediction of space weather events priorly. 

## Project structure

Application consists of multiple parts:

- [api](api) - backend application responsible for serving ionospheric data in JSON format (uses [FastAPI](https://fastapi.tiangolo.com/) framework / Python)
- [app](app) - frontend application written in [React](https://reactjs.org/) / Typescript
- [pipeline](pipeline) - data pipeline for processing multiple ionospheric sources (multiple languages, but mostly Python and Matlab)
  - [ham](pipeline%2Fham) - processing data from HAM radio reporting network (WSPR)
  - [iss](pipeline%2Fiss) - processing data from FPMU onboard International Space Station
  - [model](pipeline%2Fmodel) - processing NeQuickG model data
  - [package](pipeline%2Fpackage) - "packaging" above sources to be used by API (changing resolution, renaming columns)
- [scripts](scripts) - additional features and scripts
  - Particle Swarm Optimization algorithm
  - visualization in Python

## Examples and Screenshots

![alt text](./pictures/space-radio-fori-ham.png?raw=true)

![alt text](./pictures/space-radio-fori-iss.png?raw=true)

![alt text](./pictures/space-radio-fori-model.png?raw=true)

![alt text](./pictures/space-radio-fori-sample.png?raw=true)

## Running the project

You have to run frontend and backend separately, please see README files for [app](app) and [api](api).
