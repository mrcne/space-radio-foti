import {
  geoGraticule10,
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
} from "d3-geo";
import { Box } from "grommet";
import { useEffect, useMemo } from "react";
import { feature } from "topojson";
import { Point } from "geojson";
import * as d3 from "d3";
import styled from "styled-components";

import useData, { ElectronDensityDatum } from "./useData";
import Legend from "./Legend";
import interpolateColors from "./utils/interpolateColors";
import { Dataset, datasetConfigs, DatasetDisplayConfig } from "./dataConfig";

type CanvasSize = {
  width: number,
  height: number,
};

const StyledCanvas = styled.canvas`
  width: 100%;
  max-width: 800px;
  height: auto;
  padding: 10px 20px;
`;

export default function DataVisualization({
  dataset,
  size = { width: 960, height: 500 },
}: {
  dataset: Dataset;
  size?: CanvasSize;
}) {
  const [data, loading] = useData(dataset);

  const datasetConfig: DatasetDisplayConfig = useMemo(() => {
    if (datasetConfigs[dataset] === undefined) return datasetConfigs[Dataset.sample];
    return datasetConfigs[dataset];
  }, [dataset]);

  useEffect(() => {
    if (data) renderVisualization(size, data, datasetConfig.domainRange);
  }, [data, datasetConfig.domainRange, size]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box
      flex
      align="center"
      margin="10px 20px"
      justify="center"
    >
      <StyledCanvas id="data-visualization" width={size.width} height={size.height}></StyledCanvas>
      <Legend
        label={datasetConfig.legendLabel}
        domain={datasetConfig.domainRange}
      />
    </Box>
  );
}

// https://observablehq.com/@d3/solar-terminator?collection=@d3/d3-geo
async function renderVisualization(
  size: CanvasSize,
  data: Array<ElectronDensityDatum>,
  domain: number[]
) {
  const response = await fetch(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json"
  );
  const world = await response.json();
  const land = feature(world, world.objects.land); // The land masses
  const graticule = geoGraticule10(); // The grid of meridians and parallels
  const sphere = { type: "Sphere" }; // An outline for the globe itself

  const projection = geoNaturalEarth1();

  const canvas = document.getElementById(
    "data-visualization"
  ) as HTMLCanvasElement;

  if (!canvas) throw new Error("No canvas!");

  const context = canvas.getContext("2d");
  if (!context) throw new Error("No 2D context!");

  fixPixelation(canvas, context, size);

  const pathGenerator = geoPath(projection, context);

  context.beginPath();
  pathGenerator(graticule);
  context.strokeStyle = "#ccc";
  context.stroke();

  context.beginPath();
  pathGenerator(land);
  context.strokeStyle = "#000";
  context.stroke();

  context.beginPath();
  pathGenerator(sphere as GeoPermissibleObjects);
  context.strokeStyle = "#000";
  context.stroke();

  const colorGenerator = d3.scaleSequential(interpolateColors).domain(domain);

  // This is likely a very inefficient way to do this.
  for (let datum of data) {
    const geoPoint: Point = {
      type: "Point",
      coordinates: [datum.long, datum.lat],
    };
    context.beginPath();
    pathGenerator(geoPoint);

    const color = colorGenerator(datum.value) as unknown;
    context.fillStyle = color as string;
    context.fill();
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#correcting_resolution_in_a_canvas
function fixPixelation(canvas: any, context: any, { width, height }: CanvasSize) {
  // Set actual size in memory (scaled to account for extra pixel density).
  const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  canvas.width = width * scale;
  canvas.height = height * scale;

  // Normalize coordinate system to use css pixels.
  context.scale(scale, scale);
}
