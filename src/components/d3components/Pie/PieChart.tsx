import {useRef, useEffect} from 'react'
import { pie, scaleOrdinal, schemeTableau10, group, ScaleOrdinal, select } from 'd3'
import pieChartData from './pie_data.json'
import { drawPie } from './drawPie';


interface PieChartProps {
    width?: number;
    height?: number;
    type?: 'pie' | 'donut';
}

const PieChart = ({width = 960 , height = 600, type='pie'}: PieChartProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    
    const pieCategories = [...new Set(pieChartData.map(d => d.type))]
    const color:ScaleOrdinal<string, string> = scaleOrdinal<string,string>().domain(pieCategories).range(schemeTableau10)

    // 1 Grouping the data based on the type field
    const groupedData = group(pieChartData, d => d.type)
    console.log('this is the grouped data', groupedData)

    // 2 Calculate the count of eacth type category
    const pieData = Array.from(groupedData, ([key, value]) => ({ type: key, count: value.length }));
    console.log('this is the pie data', pieData);

    // 3. Create a pie layout function
    const pieGenerator = pie<{ type: string; count: number }>()
        .value(d => d.count)
        .sort(null);

    // 4. Generate the pie layout data, creating pies
    const pieLayoutData = pieGenerator(pieData);
    console.log('Pies pie layout data', pieLayoutData);

   
    useEffect(() => {
        const SVG = select(svgRef.current)
        drawPie({SVG, color, width, height, pieGenerator, pieLayoutData, type})
    },[color, width, height, pieGenerator, pieLayoutData, type])
    return (
        <>
            <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}></svg>
        </>
    )
}

export default PieChart