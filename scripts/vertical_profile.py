""" Plot vertical electron density profile at a given location and time """
import matplotlib.pyplot as plt
import numpy as np
from NequickG import NEQTime, Position, GalileoBroadcast
from NequickG_global import NequickG_global


""" Input Parameters here """
mth = 11 #4
UT = 10 #2
electron_density = []  # two dimensional array  lat x lon
lat = []  # [y/4 for y in range(-89, 91)]  #90#40
element_lat = -89
while element_lat <= 90:
    lat.append(element_lat)
    element_lat += 2.5

lon = [] #-180#100
element_lon = -180
while element_lon <= 180:
    lon.append(element_lon)
    element_lon += 5


required_height_of_study = 400  #in Kms
#Az = 64
## Gallileo Coefficients backing to November 11, 2017
#  3.9250e+01
# -3.9063e-02
# 8.1177e-03

## Gallileo Coefficients backing to January 1st, 2017
a0 = 4.4000e+01
a1 = 3.8281e-01
a2 = -1.8616e-03
""" Processing Below """
# Create input objects
TX = NEQTime(mth, UT)
#BX = GalileoBroadcast(Az,0,0)
BX = GalileoBroadcast(a0, a1, a2)
hs = required_height_of_study
#print(f'@height={hs}')
print('latitude, longitude, E-density')
for i in range(len(lat)):
    electron_density.append([])
    for j in range(len(lon)):
        RX = Position(lat[i], lon[j])

        # Create Nequick models
        NEQ_global = NequickG_global(TX, BX)
        NEQ, Para = NEQ_global.get_Nequick_local(RX)

        # Extract information from model

        # hmin = 400 #100
        # hmax = 401 #1000
        # hs = np.arange(hmin, hmax)   #@height=[400], electron density=[1.72632698e+11]

        N = NEQ.electrondensity(hs)
        Azr = Para.Azr
        electron_density[-1].append(N)
        print(f'{lat[i]}, {lon[j]}, {N}')

print(f'electron_density matrix is:\n{electron_density}')
