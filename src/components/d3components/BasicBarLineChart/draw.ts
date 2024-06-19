import { axisBottom, axisLeft, extent, scaleLinear, scaleTime, Selection, timeFormat } from "d3";

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
export default function draw({SVG,parsedData,width, height, margin, xScaleRef, yScaleRef}: DrawChartParams) {
    console.log('daata', parsedData);
    const xExtent = extent(parsedData, d => d.dataKey) as [Date, Date];
    const yExtent = extent(parsedData, d => d.dataValue) as [number, number];
    // Creating the scales
    const xScale = scaleTime().domain([xExtent[0], xExtent[1]]).range([margin.left, width-margin.right])
    const yScale = scaleLinear().domain([Math.min(0, yExtent[0]), yExtent[1]]).range([height-margin.top, margin.bottom])
    console.log('x and y extents are', xExtent, yExtent, typeof (xExtent[1]));

    // const barWidth = ((width-margin.left-margin.right) / parsedData.length);
    const barWidth = ((width) / parsedData.length);
    console.log('this is the bar width', barWidth, width, parsedData.length, margin.left, margin.right);

    const updatedBars = parsedData.map((d, i) => ({
        // x: margin.left + i * barWidth, // Adjusting x position to center the bar
        x: xScale(d.dataKey),
        y: yScale(d.dataValue),
        height: height - margin.bottom - yScale(d.dataValue),
        width: barWidth,
        fill: 'rebeccapurple',
        text: d.dataValue
    }));

    // Adding axes
    // SVG.append('g')
    // .attr('transform', `translate(${margin.left}, 0)`)
    // .call(axisLeft(yScale).ticks(3))

    // Define the time format for the x-axis ticks
    // const formatTime = timeFormat("%d %b %Y");

    // Adding x-axis
    // SVG.append('g')
    //     .attr('transform', `translate(0, ${height - margin.bottom})`)
    //     .call(axisBottom(xScale).ticks(parsedData.length-1).tickFormat(formatTime));
    xScaleRef.current = xScale
    yScaleRef.current = yScale
    return updatedBars
}