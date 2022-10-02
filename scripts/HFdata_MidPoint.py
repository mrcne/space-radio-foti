#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Matthew Downs, 2E1GYP, FELLOWSHIP OF THE IONOSPHERE
# This script queries the WSPRnet database for 2 days (up to a maximum of 100000 rows) of WSPR spots across all HF bands.
# Each spot link is derived to a geographic mid-point.  This midpoint is collated with its timestamp and relevant radio band, 
# and ingested into the database serving our mapping application.
# In the finished project, this process would auto-execute hourly.
import requests
import json
import pandas as pd  
import csv
from cmath import pi
from math import radians, cos, sin, sqrt, degrees, asin, atan2, acos
import math
import os
from csv import reader
import re

print("Retrieving data, Please wait...")

# Remove old data if it is present
try:
	os.remove("HF_Midpoint.csv")
except:
	pass
	
# Query WSPRnet database for last 1 hour of spots
url = 'http://dbsrv1.wspr.live/?query=select%20*%20from%20wspr.rx%20where%20time%20%3E%20subtractHours(now(),%202)%20limit%20100000%20format%20CSV'
x = requests.post(url)
output = x.text

print("Data succesfully retrieved")

# Create csv to hold spots
f = open("HF_Midpoint.csv", "a")
# Write column headers to csv
f.write("id,time,band,rx_sign,rx_lat,rx_lon,rx_loc,tx_sign,tx_lat,tx_lon,tx_loc,distance,azimuth,rx_azimuth,frequency,power,snr,drift,version,code,value")
f.write("\n")
line=""
# Write spots to csv
for row in output:
	line+=row
	f.write(row)

f.close()

def getMidpoint(lat1,lon1,lat2,lon2):  
	return ((lat1 + lat2)/2, (lon1 + lon2)/2)
    

print("Building output file...")

# Create Final Output file for ingest into mapping server (Time, Band, Lat, Lon)
df = pd.read_csv('HF_Midpoint.csv', index_col=0)
r = 0
line="Time,Band,Lat,Lon\n"

for index, row in df.iterrows():
	r+=1

	try:
		Time=(df.iloc[r]['time'])
		TxLat=(df.iloc[r]['tx_lat'])
		TxLon=(df.iloc[r]['tx_lon'])
		RxLat=(df.iloc[r]['rx_lat'])
		RxLon=(df.iloc[r]['rx_lon'])
		Distance=(df.iloc[r]['distance'])
		Distance = Distance * 1000.0
		Frequency=(df.iloc[r]['frequency']) # Hz
		if Frequency > 3000000: # Only interested in HF 3-30MHz
			Frequency = str(Frequency)
			Pattern80m = '3\d\d\d\d\d\d'
			Pattern60m = '5\d\d\d\d\d\d'
			Pattern40m = '7\d\d\d\d\d\d'
			Pattern30m = '10\d\d\d\d\d\d'
			Pattern20m = '14\d\d\d\d\d\d'
			Pattern17m = '18\d\d\d\d\d\d'
			Pattern15m = '21\d\d\d\d\d\d'
			Pattern12m = '24\d\d\d\d\d\d'
			Pattern10m = '28\d\d\d\d\d\d'
			if re.match(Pattern80m, Frequency):
				Band = "80m"
			if re.match(Pattern60m, Frequency):
				Band = "60m"
			if re.match(Pattern40m, Frequency):
				Band = "40m"
			if re.match(Pattern30m, Frequency):
				Band = "30m"
			if re.match(Pattern20m, Frequency):
				Band = "20m"
			if re.match(Pattern17m, Frequency):
				Band = "17m"
			if re.match(Pattern15m, Frequency):
				Band = "15m"
			if re.match(Pattern12m, Frequency):
				Band = "12m"
			if re.match(Pattern10m, Frequency):
				Band = "10m"
			TxPower=(df.iloc[r]['power']) #dBm
			RxSNR=(df.iloc[r]['snr'])
			if Distance > 1700: # Approx 1700m/10 miles (Radio Horizon)
				Midpoint = getMidpoint(TxLat, TxLon, RxLat, RxLon)	
				MPlat = (list(Midpoint)[0])
				MPlon = (list(Midpoint)[1])
				line+=str(Time)
				line+=","
				line+=str(Band)
				line+=","
				line+=str(MPlat)
				line+=","
				line+=str(MPlon)
				line+="\n"
			
	except:
		pass


f = open("HF_Midpoint.csv", "w")
f.write(line)
f.close()

print("Complete")



  




