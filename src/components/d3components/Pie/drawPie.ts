
import {arc, Selection, ScaleOrdinal, Pie, PieArcDatum, Arc} from 'd3'

interface drawPieTypes {
    SVG: Selection<SVGSVGElement | null, unknown, null, undefined>,
    color: ScaleOrdinal<string, string>,
    width: number;
    height: number;
    pieGenerator: Pie<any, {
        type: string;
        count: number;
    }>,
    pieLayoutData: PieArcDatum<{
        type: string;
        count: number;
    }>[];
    type: string;
}
export function drawPie({SVG, color, width, height, pieGenerator, pieLayoutData, type}: drawPieTypes) {
     // Clear previous content
     SVG.selectAll("*").remove();
    
    // Computing the radius
    const radius = Math.min(width,height) / 2;
    // console.log('this is the radius', radius);

    // Appending a g element in the svg
    let g = SVG.select('g');

      // Append a new 'g' element if it does not exist
      if (g.empty()) {
        g = SVG.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
      } else {
        // Update the transform attribute if 'g' element already exists
        g.attr('transform', `translate(${width / 2},${height / 2})`);
      }

    // Creating the arc generator
    let arcGenerator: Arc<any, PieArcDatum<{ type: string; count: number }>>;
    if(type === 'pie') {
        arcGenerator = arc<d3.PieArcDatum<{ type: string; count: number }>>()
        .innerRadius(0)
        .outerRadius(radius);
            // Bind data and create one path per pie slice
            g.selectAll('path')
              .data(pieLayoutData)
              .enter()
              .append('path')
              .transition()
              .duration(500)
              .attr('d', arcGenerator)
              .attr('fill', d => color(d.data.type))
              .attr('stroke-width', 2);
        } else if(type === 'donut') {
        arcGenerator = arc<d3.PieArcDatum<{ type: string; count: number }>>()
        .innerRadius(radius/2)
        .outerRadius(radius);
        // Bind data and create one path per pie slice
        g.selectAll('path')
          .data(pieLayoutData)
          .enter()
          .append('path')
          .transition()
          .duration(500)
          .attr('d', arcGenerator)
          .attr('fill', d => color(d.data.type))
          .attr('stroke-width', 2);

    }

     //Optional: Adding labels 
    //  g.selectAll('text')
    //  .data(pieLayoutData)
    //  .enter()
    //  .append('text')
    //  .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
    //  .attr('dy', '0.1em')
    //  .attr('text-anchor', 'middle')
    //  .style('font-size', '10px')
    //  .style('color', '#fff')
    //  .style('text-transform', 'capitalize')
    //  .text(d => d.data.type);
}