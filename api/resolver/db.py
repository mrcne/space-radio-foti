import csv
import os


def get_iss_values():
    out_dir = './poor-mans-database/iss'

    # get only csv files from directory
    files = [f for f in os.listdir(out_dir) if os.path.isfile(os.path.join(out_dir, f)) and f.endswith('.csv')]

    if len(files) == 0:
        return []

    filename_in = out_dir + '/' + files[0]

    result = []
    with open(filename_in, newline='') as csvin:
        reader = csv.DictReader(csvin)
        for row in reader:
            result.append({'timestamp': int(float(row['timestamp'])), 'lat': row['lat'], 'long': row['long'], 'value': float(row['value1'])})

    return result


def get_ham_values():
    out_dir = './poor-mans-database/ham'

    # get only csv files from directory
    files = [f for f in os.listdir(out_dir) if os.path.isfile(os.path.join(out_dir, f)) and f.endswith('.csv')]

    if len(files) == 0:
        return []

    filename_in = out_dir + '/' + files[0]

    result = []
    with open(filename_in, newline='') as csvin:
        reader = csv.DictReader(csvin)
        for row in reader:
            result.append({'timestamp': int(float(row['timestamp'])), 'lat': row['lat'], 'long': row['long'], 'value': float(row['value1'])})

    return result

def get_model_values():
    out_dir = './poor-mans-database/model'

    # get only csv files from directory
    files = [f for f in os.listdir(out_dir) if os.path.isfile(os.path.join(out_dir, f)) and f.endswith('.csv')]

    if len(files) == 0:
        return []

    filename_in = out_dir + '/' + files[0]

    result = []
    with open(filename_in, newline='') as csvin:
        reader = csv.DictReader(csvin)
        for row in reader:
            result.append({'timestamp': int(float(row['timestamp'])), 'lat': row['lat'], 'long': row['long'], 'value': float(row['value1'])})

    return result
