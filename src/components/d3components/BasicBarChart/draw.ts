import { extent, scaleLinear, scaleTime, Selection } from "d3";

// interface IBarStateTypes {
//     x: number;
//     y: number;
//     height: number;
//     fill: string;
//   }
interface DrawChartParams {
    SVG: Selection<SVGSVGElement, unknown, HTMLElement, any>;
    data: {dataKey: Date; dataValue: number}[];
    width: number;
    height: number;
    margin: {top: number; right: number; bottom: number; left: number}
    parsedData: {dataKey: Date, dataValue: number}[]
    // bars: IBarStateTypes[],
    // setBars: React.Dispatch<React.SetStateAction<IBarStateTypes[]>>
}
export default function draw({SVG,parsedData,width, height, margin}: DrawChartParams) {
    console.log('daata', parsedData);
    const xExtent = extent(parsedData, d => d.dataKey) as [Date, Date];
    const yExtent = extent(parsedData, d => d.dataValue) as [number, number];
    // Creating the scales
    const xScale = scaleTime().domain(xExtent).range([margin.left, width-margin.right])
    const yScale = scaleLinear().domain(yExtent).range([height-margin.top, margin.bottom])
    console.log('x and y extents are', xExtent, yExtent, typeof (xExtent[1]));

    const barWidth = (width-margin.left-margin.right) / parsedData.length 
    console.log('this is the bar width', barWidth);

    const updatedBars = parsedData.map((d) => ({
        x: xScale(new Date(d.dataKey)),
        y: height - yScale(d.dataValue),
        height: yScale(d.dataValue),
        width: barWidth,
        fill: '#fff'
    }))

    
        
    return updatedBars
}