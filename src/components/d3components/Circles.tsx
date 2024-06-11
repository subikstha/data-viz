import styles from './circles.module.css'
import {useRef, useState, useEffect} from 'react'
import { getData } from './utils';
import {scaleLinear, select} from 'd3'


const colors = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']
const Circles = ({width=960, height=500}: {width?: number; height?: number;}) => {
    const [data, setData] = useState(getData())
    console.log('this is the circle data', data);
    const svgRef = useRef(null)
    console.log(svgRef.current);

    const handleButtonClick = () => {
        setData(getData())
    }

    useEffect(() => {
        const maxRadius = 40;
        const xScale = scaleLinear().domain([0,1]).range([0,width])
        const yScale = scaleLinear().domain([0,1]).range([height,0])
        const rScale = scaleLinear().domain([0,1]).range([0, maxRadius])

        select(svgRef.current)
            .selectAll('circle')
            .data(data)
            .transition()
            .duration(1000)
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', d => rScale(d.r))
            .attr('fill', d => colors[d.color])

    },[data, width, height])
  return (
    <div>
        <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
            {data.map(d => <circle fill="#fff"></circle>)}
        </svg>
        <div>
            <button onClick={handleButtonClick}>Refresh Button</button>
        </div>
    </div>
  )
}

export default Circles