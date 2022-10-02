import { useEffect, useState } from "react";

export enum Dataset {
  ham = "HAM",
  iss = "ISS",
  model = "NeQuickG",
}

export type ElectronDensityDatum = {
  lat: number;
  long: number;
  timestamp: string;
  value: number;
};

export default function useData(
  dataset: Dataset
): [Array<ElectronDensityDatum>, boolean] {
  let getter: () => Promise<Array<ElectronDensityDatum>>;

  if (dataset === Dataset.ham) {
    getter = getHAMData;
  } else {
    console.error("This dataset is not yet supported");
    getter = () => Promise.resolve([]);
  }

  const [data, setData] = useState<Array<ElectronDensityDatum>>([]);

  useEffect(() => {
    getter().then((data) => setData(data));
  }, [getter]);

  const loading = !data;
  return [data, loading];
}

async function getHAMData(): Promise<Array<ElectronDensityDatum>> {
  const response = await fetch(
    "https://space-radio-foti.herokuapp.com/sample/spots"
  );
  const json = await response.json();

  return json;
}
