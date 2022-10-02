/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Grommet, Collapsible } from "grommet";
import { CirclePlay, Menu, Next, Previous } from "grommet-icons";
import {
  geoGraticule10,
  geoNaturalEarth1,
  geoPath,
  GeoPermissibleObjects,
} from "d3-geo";
import { feature } from "topojson";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App">
      <Grommet theme={theme} full>
        <Box fill>
          <AppBar>
            <Button
              icon={<Menu />}
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <Heading
              level="3"
              margin={{
                top: "none",
                right: "none",
                bottom: "none",
                left: "1rem",
              }}
            >
              The Fellowship of the Ionosphere
            </Heading>
          </AppBar>
          <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
            <Sidebar open={showSidebar} />
            <DataVisualization />
          </Box>
          <Controls />
        </Box>
      </Grommet>
    </div>
  );
}

function AppBar(props: any) {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="start"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: "1" }}
      {...props}
    />
  );
}

function Sidebar(props: any) {
  return (
    <Collapsible direction="horizontal" open={props.open}>
      <Box
        flex
        width="medium"
        background="light-2"
        elevation="small"
        align="center"
        justify="center"
      >
        sidebar
      </Box>
    </Collapsible>
  );
}

function DataVisualization({
  width = 960,
  height = 1000,
}: {
  width?: number;
  height?: number;
}) {
  useEffect(() => {
    renderVisualization();
  });

  return (
    <Box flex align="center" justify="center">
      <canvas id="data-visualization" width={width} height={height}></canvas>
    </Box>
  );

  // https://observablehq.com/@d3/solar-terminator?collection=@d3/d3-geo
  async function renderVisualization() {
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

    var context = canvas.getContext("2d");
    if (!context) throw new Error("No 2D context!");

    fixPixellation(canvas, context, width);

    // Hard-coding to center the drawing on the canvas 😭 there is definitely a smart way to do this...
    context.translate(0, 200);

    const path = geoPath(projection, context);

    context.beginPath();
    path(graticule);
    context.strokeStyle = "#ccc";
    context.stroke();

    context.beginPath();
    path(land);
    context.fillStyle = "#000";
    context.fill();

    context.beginPath();
    path(sphere as GeoPermissibleObjects);
    context.strokeStyle = "#000";
    context.stroke();
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#correcting_resolution_in_a_canvas
  function fixPixellation(canvas: any, context: any, size: number) {
    // Set display size (css pixels).
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = size * scale;
    canvas.height = size * scale;

    // Normalize coordinate system to use css pixels.
    context.scale(scale, scale);
  }
}

function Controls(props: any) {
  return (
    <Box align="center" justify="center" background="brand" pad="1rem">
      <code>2022-09-28 18:10:00 UTC</code>
      <Box direction="row">
        <Button icon={<Previous />} />
        <Button icon={<CirclePlay size="large" />} />
        <Button icon={<Next />} />
      </Box>
    </Box>
  );
}

export default App;
