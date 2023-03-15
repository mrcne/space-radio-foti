import { useEffect, useState } from "react";
import { Dataset } from "./dataConfig";

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
  } else if (dataset === Dataset.iss) {
    getter = getISSData;
  } else if (dataset === Dataset.model) {
    getter = getModelData;
  } else if (dataset === Dataset.sample) {
    getter = getSampleData;
  } else {
    console.error("This dataset is not yet supported");
    getter = getNoData;
  }

  const [data, setData] = useState<Array<ElectronDensityDatum>>([]);

  useEffect(() => {
    getter().then((data) => setData(data));
  }, [getter]);

  const loading = !data;
  return [data, loading];
}

async function getHAMData() {
  const response = await fetch(
    "https://space-radio-foti.herokuapp.com/ham/tec"
  );
  const json = await response.json();
  return json;
}

async function getISSData() {
  const response = await fetch(
    "https://space-radio-foti.herokuapp.com/iss/tec"
  );
  const json = await response.json();
  return json;
}

async function getModelData() {
  const response = await fetch(
    "https://space-radio-foti.herokuapp.com/model/tec"
  );
  const json = await response.json();
  return json;
}

async function getSampleData() {
  const response = await fetch(
    // "http://127.0.0.1:8000/ham/tec"
    // "http://127.0.0.1:8000/iss/tec?sample=1"
    "https://space-radio-foti.herokuapp.com/sample/spots"
  );
  const json = await response.json();
  return json;
}

async function getNoData() {
  return [];
}
