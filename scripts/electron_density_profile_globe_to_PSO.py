""" Applies PSO for max vertical electron density profile at a given location and time """
import matplotlib.pyplot as plt
import numpy as np
from NequickG import NEQTime, Position, GalileoBroadcast
from NequickG_global import NequickG_global

def e_density(latt, long):
    """ Input Parameters here """
    mth = 11 #January
    UT = 0 #Universal Time
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
    print(f'On January 1st, 2017, at 12:00 AM, @height={hs}')
    print('latitude, longitude, E-density')

    RX = Position(latt, long)

    # Create Nequick models
    NEQ_global = NequickG_global(TX, BX)
    NEQ, Para = NEQ_global.get_Nequick_local(RX)

    # Extract information from model

    # hmin = 400 #100
    # hmax = 401 #1000
    # hs = np.arange(hmin, hmax)   #@height=[400], electron density=[1.72632698e+11]

    N = NEQ.electrondensity(hs)
    return N**-1
# Plotting
# label = ' lat:' + str(lat) + ' lon:' + str(lon)
# plt.plot(hs, N, label = label)
# plt.plot(Para.hmF2,Para.NmF2 * 10 ** 11, marker = 'o', markersize=5, linestyle='None', label = 'F2 anchor pt')
# plt.plot(Para.hmF1,Para.NmF1* 10 ** 11, marker = 'o', markersize=5, linestyle='None', label = 'F1 anchor pt')
# plt.plot(Para.hmE,Para.NmE* 10 ** 11, marker = 'o', markersize=5, linestyle='None', label = 'E anchor pt')
# plt.xlabel('Height(km)')
# plt.ylabel("Electron Density (m^-3)")
# plt.title("Nequick-G:\n" + 'mth:' + str(mth) + ' UT:' + str(UT) + ' Azr:' + str(int(Azr)))
# plt.grid()
# plt.legend()
# plt.show()

