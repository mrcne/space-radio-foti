import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Grommet,
  Collapsible,
  Select,
  Image,
  Tip,
} from "grommet";
import { CirclePlay, Download, Next, Previous, Upload } from "grommet-icons";
import DataVisualization from "./DataVisualization";
import logo from "./logo.jpeg";
import { Dataset } from "./dataConfig";

const theme = {
  global: {
    font: {
      family: "Inter",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  // const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(Dataset.model);

  return (
    <div className="App">
      <Grommet theme={theme} full>
        <Box fill>
          <AppBar>
            {/* Image is public domain - https://freesvg.org/electron-image */}
            <Image src={logo} width="50" />
            {/* <Button
              icon={<Menu />}
              onClick={() => setShowSidebar(!showSidebar)}
            /> */}
            <Heading
              level="3"
              weight="800"
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
            <Sidebar open={false} />
            <DataVisualization dataset={selectedDataset} />
          </Box>
          <Controls
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
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
      background="light-2"
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

function Controls({
  selectedDataset,
  setSelectedDataset,
}: {
  selectedDataset: Dataset;
  setSelectedDataset: Function;
}) {
  return (
    <Box
      align="center"
      justify="between"
      background="light-1"
      pad="1rem"
      direction="row"
    >
      <Box width="200px" justify="start">
        <Select
          options={["HAM", "ISS", "NeQuickG", "Sample"]}
          value={selectedDataset}
          onChange={({ option }) => setSelectedDataset(option)}
        />
      </Box>
      <Box align="center">
        <code>2017-01-01 18:10:00 UTC</code>
        <Box direction="row">
          <Button icon={<Previous />} />
          <Button icon={<CirclePlay size="large" />} />
          <Button icon={<Next />} />
        </Box>
      </Box>
      <Box direction="row" width="200px" justify="end">
        <Tip content="Download">
          <Button icon={<Download />} />
        </Tip>
        <Tip content="Upload">
          <Button icon={<Upload />} title="Upload" />
        </Tip>
      </Box>
    </Box>
  );
}

export default App;
