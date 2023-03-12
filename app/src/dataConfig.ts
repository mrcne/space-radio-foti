export type Url = string;
export enum Dataset {
  ham = "HAM",
  iss = "ISS",
  model = "NeQuickG",
  sample = "Sample",
}

export type DatasetDisplayConfig = {
  url: Url,
  showLegend: boolean,
  legendLabel: string,
  domainRange: [number, number],
};

const serverBase = 'https://space-radio-foti.herokuapp.com';
// local testing:
// const serverBase = 'http://127.0.0.1:8000';

export const datasetConfigs: Record<string, DatasetDisplayConfig> = {
  [Dataset.ham]: {
    url: `${ serverBase }/ham/tec`,
    showLegend: true,
    legendLabel: 'Band',
    domainRange: [10, 80],
  },
  [Dataset.iss]: {
    url: `${ serverBase }/iss/tec`,
    showLegend: true,
    legendLabel: 'Electron Density (el/m3)',
    domainRange: [125000000000, 1510000000000],
  },
  [Dataset.model]: {
    url: `${ serverBase }/model/tec`,
    showLegend: true,
    legendLabel: 'Electron Density (el/m3)',
    domainRange: [9642404229, 103642404229],
  },
  [Dataset.sample]: {
    url: `${ serverBase }/sample/spots`,
    showLegend: true,
    legendLabel: 'Random values (%)',
    domainRange: [0, 100],
  },
};
