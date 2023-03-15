import * as d3 from "d3";
import styled from "styled-components";
import interpolateColors from "./utils/interpolateColors";

const StyledLabelHeader = styled.h4`
  margin: 5px 0;
  font-size: 16px;
`;

export default function Legend({
  label="Data (%)",
  domain=[100, 500],
}: {
  label?: string;
  domain?: [number, number];
}) {
  // based on: https://gist.github.com/HarryStevens/6eb89487fc99ad016723b901cbd57fde
  const padding = 40;
  const width = 320;
  const barHeight = 8;
  const height = 28;
  const innerWidth = width - (padding * 2);

  const colorGenerator = d3.scaleSequential(interpolateColors).domain(domain);

  const midpoint = (domain[0]+domain[1])/2;
  const xTicks = [domain[0], midpoint, domain[1]];

  const xScale = d3.scaleLinear()
      .range([0, innerWidth])
      .domain(domain);

  const xAxis = d3.axisBottom(xScale)
      .tickSize(barHeight * 2)
      .tickValues(xTicks);

  const svg = d3.select("#legend")
  if (!svg) throw new Error("No canvas!");

  svg.attr("width", width).attr("height", height);
  svg.selectAll("*").remove();
  const g = svg.append("g").attr("transform", "translate(" + padding + ", 0)");

  const defs = svg.append("defs");
  const linearGradient = defs.append("linearGradient").attr("id", "myGradient");
  linearGradient.selectAll("stop")
    .data(xTicks)
    .enter().append("stop")
      .attr("offset", (value) => ((value - domain[0]) / (domain[1] - domain[0]) * 100) + "%")
      .attr("stop-color", (value) => colorGenerator(value));

  g.append("rect")
    .attr("width", innerWidth)
    .attr("height", barHeight)
    .style("fill", "url(#myGradient)");

  g.append("g")
    .call(xAxis)
    .select(".domain").remove();

  return (
    <>
      <StyledLabelHeader>{ label }</StyledLabelHeader>
      <svg id="legend" width="100" height="100"></svg>
    </>
  );
}
