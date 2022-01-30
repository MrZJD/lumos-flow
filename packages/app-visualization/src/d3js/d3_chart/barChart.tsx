import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './styles.css';

const config = {
  width: 300,
  barHeight: 30,
  scaleFactor: 20
};

const data = [10, 5, 12, 15];

export default () => {
  const svgRef = useRef<SVGSVGElement | undefined>();

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    // svg
    const graph = d3.select(svgRef.current)
      .attr('id', 'bar-chart')
      .attr('width', config.width)
      .attr('height', config.barHeight * data.length);

    // 创建组
    const bar = graph.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate(0, ${i * config.barHeight})`
      });

    // 创建bar
    bar.append('rect')
      .attr('width', function(d) {
        return d * config.scaleFactor
      })
      .attr('height', config.barHeight - 10);

    // 创建txt
    bar.append('text')
      .attr('x', function(d) {
        return d * config.scaleFactor
      })
      .attr('y', config.barHeight / 2)
      .attr('dx', '-.35em')
      .text((d) => d);
  }, [])

  return (
    <svg id="bar-chart" ref={svgRef}></svg>
  );
}

