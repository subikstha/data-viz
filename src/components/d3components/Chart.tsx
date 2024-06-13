import {useEffect, useRef} from 'react'
import { scaleLinear, scaleBand, max, select, axisLeft,format } from "d3"

const ChartBar = ({width, height, data}) => {
  // console.log('this is the data inside the chart component', data)
  const margin = 30
  const lines = [10,20,30,40]
  const yScaleRefSunshine = useRef()

  const xScale = scaleLinear().domain([0, max(data, d => d.sunshine)]).range([margin,width - margin])
  const yScale = scaleBand().domain(data).range([0, height - 2*margin]).padding(0.1)


  const rectangles = data.map(d => {
    return <rect key={d.city} x={margin} y={yScale(d)} height={yScale.bandwidth()} width={xScale(d.sunshine)} fill='darkorange' ></rect>
  })

  const labels = data.map(d => {
    return <text fill="#fff" textAnchor="end" key={d.city} x={xScale(d.sunshine)} y={yScale(d)+15}>
      {d.city}
    </text>
  })

  const gridLines = lines.map((l,i) => (
    <g key={i}>
    <line y1={0} y2={height-margin} x1={xScale(l)} x2={xScale(l)} stroke="#fff">
      <text fill="#fff" textAnchor="middle" fontSize="12px" x={xScale(l)} y={height-margin}>{l}</text>
    </line>
    </g>
  ))

  yScaleRefSunshine.current = yScale;

  useEffect(() => {
    select(".yAxis-sunshine").call(axisLeft(yScaleRefSunshine.current).ticks(5))
  })

  return (
    <>
        <h1>Bar Chart showing sunshine by city</h1>
        <svg viewBox={`0 0 ${width} ${height}`}>
          {rectangles}
          {gridLines}
          {labels}
          {/* This g element will hold the axis */}
          <g className="yAxis-sunshine" transform={`translate(${margin}, 0)`} />
        </svg>
    </>
  )
}

export default ChartBar