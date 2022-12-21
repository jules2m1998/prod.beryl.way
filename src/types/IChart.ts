import type { ApexOptions } from "apexcharts";

interface IChart {
  type: "bar" | "line" | "area" | "boxPlot" | "treemap" | "donut";
  options?: ApexOptions;
  series: {
    name: string;
    data: number[];
  }[];
}

export type { IChart };
