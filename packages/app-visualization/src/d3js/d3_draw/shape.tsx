import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default () => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    // arc 圆弧
    const arc = d3.arc();

    const arcPath = arc({
      innerRadius: 0,
      outerRadius: 50,
      startAngle: Math.PI / 2,
      endAngle: Math.PI,
    });

    const svg = d3.select(svgRef.current)
      .attr('width', 210)
      .attr('height', 100);
    
    svg.append('path')
      .attr('d', arcPath)
      .style('fill', 'green')
      .attr('transform', 'translate(50, 50)');

    // pie
    const pie = d3.pie();

    const pieData = pie([10, 30]);

    // const ringPath = arc({
    //   innerRadius: 40,
    //   outerRadius: 50,
    //   startAngle: Math.PI / 2,
    //   endAngle: Math.PI,
    // });

    const ringPath = arc.innerRadius(40).outerRadius(50);

    svg.selectAll('g')
      .data(pieData)
      .enter()
      .append('g')
      .append('path')
      .attr('d', ringPath)
      .attr('fill', (d, i) => i % 2 === 0 ? 'pink' : 'red')
      .attr('transform', 'translate(160, 50)');

  }, []);

  return (
    <div>
      <h4>Shape API</h4>
      <svg ref={svgRef} />
    </div>
  );
};
