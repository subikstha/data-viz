import { useState, useEffect } from "react";
import * as d3 from "d3";

const width = 650;
const height = 650;

interface Datum {
    date: string;
    high: number;
    low: number;
    avg: number;
  }

type D3LineChartProps = {
    data: Datum[];
  };

const D3LineChart = ({ data }: D3LineChartProps) => {
  const [paths, setPaths] = useState<{ path: string | null; fill: string }[]>([]);

  useEffect(() => {
    console.log('running effect with data', data);
    if (!data) return;

    // Convert dates from strings to Date objects
    const parsedData = data.map(d => ({ ...d, date: new Date(d.date) }));

     // Get the min and max of temperatures, yExtent
     const highMax = d3.max(parsedData, d => d.high);
     const lowMin = d3.min(parsedData, d => d.low);
     // const [min, max] = d3.extent(data, d => d.high)

     // Get the xExtent
     const extent = d3.extent(parsedData, d => d.date)

     // Creating the scales
     const xScale = d3.scaleTime().domain(extent).range([0, width])
     const yScale = d3.scaleLinear().domain([lowMin, highMax]).range([height,0])

     // Creating two line generators
     // return xScale(d.date)} This means for each of the dates, translate that to an x value
     // var highLine = d3.line()
     //               .x((d) => {return xScale(d.date)})
     //               .y((d) => {return yScale(d.high)})
     // var lowLine = d3.line()
     //                 .x((d) => {return xScale(d.date)})
     //                 .y((d) => {return yScale(d.low)})
     // return [
     //   {path: highLine(data), fill: 'red'},
     //   {path: lowLine(data), fill: 'blue'}
     // ]

     // Instead of creating two line generators for the high and low lines, we can do as below
     const line = d3.line().x(d => xScale(d.date));

     const linePaths = [
        {path: line.y(d => yScale(d.high))(parsedData), fill: '#dc2626'},
        {path: line.y(d => yScale(d.low))(parsedData), fill: '#38bdf8'},
     ]
     
     setPaths(linePaths)
    
  }, [data]);

  return (
    <>
    <h1>Line chart</h1>
    <svg width={width} height={height}>
        {paths.map(p => {
            return <path key={p.fill} fill="none" stroke={p.fill} strokeWidth="2" d={p.path}></path>
        })}
    </svg>
    </>
  );
};

export default D3LineChart;
