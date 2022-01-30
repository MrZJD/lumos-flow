import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default () => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    // d3.axisTop();
    // d3.axisLeft();
    // d3.axisRight();
    // d3.axisBottom();

    if (!svgRef.current) {
      return;
    }

    const data = [100, 200, 300, 400, 800, 50];
    const group = ['a', 'b', 'c', 'd', 'e', 'f'];
    const dataDomain = [0, d3.max(data) || 100]; // [0, 400] // scale input
    const dataRange = [0, 400]; // scale output

    const scale = d3.scaleLinear()
      .domain(dataDomain)
      .range(dataRange);

    const svg = d3.select(svgRef.current)
      .attr('width', 500)
      .attr('height', 150)
    
    const g = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(20, ${20 * i})`)

    g.append('rect')
      .attr('width', d => scale(d)) // => 这里是把domain => 映射到range的地方
      .attr('height', 19)
      .style('fill', '#999');

    const yScale = d3.scaleLinear()
      .domain(dataDomain)
      .range(dataRange);

    const yAxis = d3.axisBottom(yScale);

    const xScale = d3.scaleLinear()
      .domain([0, 6])
      .range([0, 120])

    const xAxis = d3.axisLeft(xScale).ticks(6).tickFormat((d, i) => group[i] || String(d));

    svg.append('g')
      .attr('transform', 'translate(20, 120)')
      .call(yAxis);

    svg.append('g')
      .attr('transform', 'translate(20, 0)')
      .call(xAxis);
  }, []);

  return (
    <div>
      <h4>Axis API</h4>
      <svg ref={svgRef} />
    </div>
  );
}
