import csv
from datetime import datetime


iss_dir = '../iss/data-out'
out_fieldnames = ['timestamp', 'lat', 'long', 'value1']


def package_iss():
    filename_in = iss_dir + '/ISS_2017_1_1.csv'
    out_dir = './data-out/'

    current_file_prefix = ''
    previous_timestamp = datetime.now().timestamp()
    with open(filename_in, newline='') as csvin:
        reader = csv.DictReader(csvin)
        for row in reader:
            time = datetime(year=int(row['year']), month=int(row['month']), day=int(row['day']), hour=int(row['hour']), minute=int(row['minute']), second=int(float(row['sec'])))
            file_prefix = time.strftime('%Y%m%d')
            timestamp = time.timestamp()

            if timestamp - previous_timestamp > 60:
                print('skipping', timestamp, previous_timestamp)
                continue

            if file_prefix != current_file_prefix:
                if current_file_prefix != '':
                    csvout.close()
                current_file_prefix = file_prefix
                csvout = open(out_dir + current_file_prefix + '.csv', 'w', newline='')
                writer = csv.DictWriter(csvout, fieldnames=out_fieldnames)
                writer.writeheader()

            writer.writerow({'timestamp': timestamp, 'lat': row['Latitude (deg)'], 'long': row['Longitude (deg)'], 'value1': row['Electron Density (el/m3)']})
            previous_timestamp = timestamp


package_iss()
