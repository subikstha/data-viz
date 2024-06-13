import {useEffect, useMemo, useRef, useState} from 'react'
import data from './data.json';
import draw from './draw';
import { select } from 'd3';

interface IBarStateTypes {
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
}

interface BasicBarChartProps{
  width?: number;
  height?: number;
  margin: {top: number; right: number; bottom: number; left: number}
}
const BasicBarChart = ({width=960, height=650, margin}: BasicBarChartProps) => {
  // State to store bars
  const [bars, setBars] = useState<IBarStateTypes[]>([]);
  // Get the SVG ref using useRef
  const svgRef = useRef(null);
  // 1 First lets modify the data to convert dataKey string to Dates
  const parsedData = useMemo(() => {
    return data.map(d => ({ ...d, dataKey: new Date(d.dataKey) }));
  }, [data]);
  console.log('parsed data', parsedData)

  // 2 Call the function to draw chart in a side effect
  useEffect(() => {
    const SVG = select(svgRef.current);
    const updatedbars = draw({SVG,parsedData, width, height, margin})
    setBars(updatedbars)
  },[width, height, margin, parsedData])
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      {/* {parsedData.map(d => {
        return <g key={d.dataKey.toString()} className="bar-group"><rect></rect></g>
      })} */}
      {bars.map((b,i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.width} height={b.height} fill={b.fill}></rect>
        </g>
      ))}
      
    </svg>
  )
}

export default BasicBarChart