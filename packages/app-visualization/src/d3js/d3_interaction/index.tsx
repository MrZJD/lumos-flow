import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default () => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const rect = d3.select(svgRef.current)
      .append('rect')
      .attr('id', 'interaction-svgbox')
      .attr('width', 50)
      .attr('height', 50)
      .style('fill', 'pink');

    rect.on('mouseenter', function(event) {
      d3.select('#interaction-svgbox')
        .transition()
        .attr('fill', 'red')
        .attr('width', 60)
        .attr('height', 60);
    });

    rect.on('mouseleave', function(event) {
      d3.select('#interaction-svgbox')
        .transition()
        .attr('fill', 'pink')
        .attr('width', 50)
        .attr('height', 50);
    })
  }, []);

  return (
    <div>
      <h4>Zooming API</h4>

      <svg ref={svgRef} width="100" height="100" />
    </div>
  );
}
