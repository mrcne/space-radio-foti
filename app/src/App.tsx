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
import {
  CirclePlay,
  Download,
  Menu,
  Next,
  Previous,
  Upload,
} from "grommet-icons";
import DataVisualization from "./DataVisualization";
import logo from "./logo.jpeg";

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
            {/* Image is public domain - https://freesvg.org/electron-image */}
            <Image src={logo} width="50" />
            {/* <Button
              icon={<Menu />}
              onClick={() => setShowSidebar(!showSidebar)}
            /> */}
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

function Controls(props: any) {
  return (
    <Box
      align="center"
      justify="between"
      background="brand"
      pad="1rem"
      direction="row"
    >
      <Box width="200px" justify="start">
        <Select
          options={["HAM", "ISS", "Model"]}
          value={"HAM"}
          // onChange={({ option }) => setValue(option)}
        />
      </Box>
      <Box align="center">
        <code>2022-09-28 18:10:00 UTC</code>
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
