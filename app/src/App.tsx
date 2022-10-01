import React, { useState } from "react";
import dataVisualization from "./ionosphere_mapTEC.jpeg";
import { Box, Button, Heading, Grommet, Collapsible, Image } from "grommet";
import { CirclePlay, Menu, Next, Previous } from "grommet-icons";

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
  const [showSidebar, setShowSidebar] = useState(true);

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

function DataVisualization(props: any) {
  return (
    <Box flex align="center" justify="center">
      <Image fit="cover" src={dataVisualization} alt="An isonospheric map" />
    </Box>
  );
}

function Controls(props: any) {
  return (
    <Box align="center" justify="center" background="brand" pad="1rem">
      <p>2022-09-28 18:10:00 UTC</p>
      <Box direction="row">
        <Button icon={<Previous />} />
        <Button icon={<CirclePlay size="large" />} />
        <Button icon={<Next />} />
      </Box>
    </Box>
  );
}

export default App;
