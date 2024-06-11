import { color, select } from "d3"
import{ScaleOrdinal} from 'd3'
import Slider from 'react-input-slider'
import Legend from "./Legend"
import { useEffect, useRef } from "react"
import { drawChart } from "./drawChart"
import styles from './styles.module.css'

// https://observablehq.com/@uwdata/introduction-to-d3-part-2
interface CirclesGapMinderTypes {
    width?: number;
    height?: number;
    year?: number;
    colorScale?:  ScaleOrdinal<string, string>;
    selectedContinent?: string;
    data?: {"country": string; "year": number; "population": number; "continent": string; "life_exp": number; "gdp_cap": number}[];
    onSliderChange: ({ x: number }) => void;
    continents?: string[];
    continent?: string;
    setContinent?: (continent: string) => void
}

const margin = { left: 50, right: 20, top: 30, bottom: 50 }

function CirclesGapMinder({ width=960, height=500, data, year, colorScale, selectedContinent, onSliderChange, continents, continent, setContinent }: CirclesGapMinderTypes) {
  // this just attaches circles to the DOM - it doesn't actually set their size, color, or position
  
  // console.log('data in gapminder', data);
  const chartData = data?.filter(d => d.year == year)
  console.log('selected continent in circlesgap minder', selectedContinent);
// console.log('year data', chartData);
  const svgRef = useRef();
  useEffect(() => {
        const SVG = select(svgRef.current);
        drawChart({SVG,chartData, data, height,width,margin,colorScale,selectedContinent})
    },[chartData,data,height,width,colorScale,selectedContinent])
    
  return <div className={styles.App}>
    <h1 className={styles.header}>Gapminder Chart</h1>
    <div className={styles.slider}>
        <p>{year}</p>
        <Slider axis="x" xstep={5} xmin={1957} xmax={2007} x={year} onChange={onSliderChange}/>
        <Legend labels={continents} colorScale={colorScale} continent={continent} setContinent={setContinent}/>
    </div>
    {/* This just attaches circles to the DOM - It does'nt actually set the size position or color */}
    <div className={styles.chart}>
        <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
            <line stroke="lightgrey" strokeDasharray={"10 2"} className="life-avg" />
              <line stroke="lightgrey" strokeDasharray={"10 2"} className="gdp-avg" />
            {chartData?.map(d => <circle key={d.country} fill='#fff'/>)}
            <text fontSize="48px" fill="#fff" x={width - margin.right - 150} y={height - margin.bottom - 50}>{year}</text>
            <text y={height - 20} x={20} fill="#fff">
                GDP per Capita
              </text>
              <text
                fill="#fff"
                transform={`translate(${20},${margin.top + 100}) rotate(-90)`}
              >
                Life Expectancy
              </text>
        </svg>
    </div>
    </div>
}

export default CirclesGapMinder