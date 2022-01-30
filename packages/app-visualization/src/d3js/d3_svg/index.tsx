import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default () => {
  const svgRef = useRef<SVGSVGElement | undefined>();

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const arrowSize = 5;

    const svg = d3.select(svgRef.current)
      .attr('width', 300)
      .attr('height', 300)
      .style('margin', '20')
      .style('padding', '20')
      .style('overflow', 'visible');

    // 坐标系示意
    // x
    const corX = svg.append('g');

    corX.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 300)
      .attr('y1', 0)
      .style('stroke', '#000')
      .style('stroke-width', 2);

    corX.append('line')
      .attr('x1', 300)
      .attr('y1', 0)
      .attr('x2', 300 - arrowSize)
      .attr('y2', 0 - arrowSize)
      .style('stroke', '#000')
      .style('stroke-width', 1.5);

    corX.append('line')
      .attr('x1', 300)
      .attr('y1', 0)
      .attr('x2', 300 - arrowSize)
      .attr('y2', 0 + arrowSize)
      .style('stroke', '#000')
      .style('stroke-width', 1.5);

    corX.append('text')
      .text('x')
      .attr('x', 305)
      .attr('y', 4);

    // y
    const corY = svg.append('g');

    corY.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 300)
      .style('stroke', '#000')
      .style('stroke-width', 2);

    corY.append('line')
      .attr('x1', 0)
      .attr('y1', 300)
      .attr('x2', - arrowSize)
      .attr('y2', 300 - arrowSize)
      .style('stroke', '#000')
      .style('stroke-width', 2);

    corY.append('line')
      .attr('x1', 0)
      .attr('y1', 300)
      .attr('x2', arrowSize)
      .attr('y2', 300 - arrowSize)
      .style('stroke', '#000')
      .style('stroke-width', 2);

    corY.append('text')
      .text('y')
      .attr('x', -4)
      .attr('y', 315);

    // 线
    svg.append('line')
      .attr('x1', 100)
      .attr('y1', 100)
      .attr('x2', 200)
      .attr('y2', 200)
      .style('stroke', 'rgba(255, 0, 0, 0.5)')
      .style('stroke-width', 2);

    // 矩形
    const rect = svg.append('rect')
      .attr('x', 20)
      .attr('y', 20)
      .attr('width', 200)
      .attr('height', 100)
      .attr('fill', 'rgba(0, 255, 0, 0.5)');

    // 圆
    svg.append('circle')
      .attr('cx', 100)
      .attr('cy', 50)
      .attr('r', 20)
      .attr('fill', 'rgba(0, 0, 255, 0.5');

    // 椭圆
    svg.append('ellipse')
      .attr('cx', 100)
      .attr('cy', 150)
      .attr('rx', 100)
      .attr('ry', 50)
      .attr('fill', 'rgba(0, 0, 255, 0.5)');
  }, []);

  return (
    <svg id="svg" ref={svgRef} />
  );
}
