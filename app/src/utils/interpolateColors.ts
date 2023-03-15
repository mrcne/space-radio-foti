import { interpolateRdYlBu } from "d3";

// reverse scale Red -> Yellow -> Blue to Blue -> Yellow -> Red
export default (t: number) => interpolateRdYlBu(1 - t);
