import {scaleLinear, scaleLog, scaleSqrt, extent, axisBottom, axisLeft, mean, Selection} from 'd3'

interface DrawChartParams{
  SVG: Selection<SVGSVGElement, unknown, HTMLElement, any>;
  chartData: {"country": string; "year": number; "population": number; "continent": string; "life_exp": number; "gdp_cap": number}[];
  data: {"country": string; "year": number; "population": number; "continent": string; "life_exp": number; "gdp_cap": number}[];
  height: number;
  width: number;
  margin: {left: number, right: number, top: number, bottom: number};
  colorScale: d3.ScaleOrdinal<string, string>;
  selectedContinent: string;
}
export function drawChart({
    SVG,
    chartData,
    data,
    height,
    width,
    margin,
    colorScale,
    selectedContinent
  }:DrawChartParams) {
    const maxRadius = 40;
    const gdpExtent = extent(data, d => d.gdp_cap)
    // console.log('gdp extent', gdpExtent);
    // Scales
    // We use scaleLog if the lower and higher values are seperated by huge gap
    const xScale = scaleLog()
        .domain(extent(data, d => d.gdp_cap))
        .range([margin.left, width - margin.right])

    const yScale = scaleLinear()
        .domain(extent(data, d => d.life_exp))
        .range([ height - margin.bottom, margin.top])

    const rScale = scaleSqrt()
        .domain(extent(data, d => d.population))
        .range([1, maxRadius])

    const colorPoint = function (continent: string, selectedContinent: string) {
        // console.log('comparing', continent, selectedContinent);
        return selectedContinent === continent || selectedContinent === 'all'
    }

    // Average lines
    SVG.select('.life-avg')
        .transition()
        .duration(500)
        .attr('x1',margin.left)
        .attr('x2', width - margin.right)
        .attr('y1', mean(chartData, d => yScale(d.life_exp)))
        .attr('y2', mean(chartData, d => yScale(d.life_exp)))

        SVG.select(".gdp-avg")
        .transition()
        .duration(500)
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr(
          "x1",
          mean(chartData, (d) => xScale(d.gdp_cap))
        )
        .attr(
          "x2",
          mean(chartData, (d) => xScale(d.gdp_cap))
        )

    // Circles
    SVG.selectAll('circle')
        .data(chartData)
        .transition()
        .duration(500)
        .attr('cx', d => xScale(d.gdp_cap))
        .attr('cy', d => yScale(d.life_exp))
        .attr('r', d => rScale(d.population))
        .attr('opacity', (d) => colorPoint(d.continent,selectedContinent) ? 1 : .2)
        .style('fill', d => colorScale(d.continent))

    // Axes
    // Y axis
    SVG.append('g')
    .call(axisLeft(yScale).ticks(5))
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(g => g.select('.domain').remove()) // The above is used to remove the vertical bar in the axis
    
    // X Axis
    SVG.append('g')
    .call(axisBottom(xScale).ticks(5))
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(g => g.select('.domain').remove()) // The above is used to remove the vertical bar in the axis
  }