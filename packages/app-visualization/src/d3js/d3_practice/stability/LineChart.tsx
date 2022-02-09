import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './data/metrics.json';

interface IProps {
  width?: number;
  height?: number;
  title?: string;
}

export default (props: IProps) => {
  const {
    width = 800,
    height = 400,
    title
  } = props;
  const svgRef = useRef<SVGSVGElement>();

  const xAxisBottomPad = 20;
  const yAxisLeftPad = 40;
  const tickSize = 4;
  const xTick = 8;
  const yTick = 8;
  const yRangePad = 20;
  const axisPad = 6;

  const drawXAxis = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, range: number[]) => {
    const xAxis = svg.append('g');

    const timeScale = d3.scaleTime()
      .domain(range);

    const scaleMapper = timeScale.range([yAxisLeftPad, width]);
    const timeFormat = timeScale.tickFormat(xTick, '%H:%M');

    xAxis.attr('transform', `translate(0, ${height - xAxisBottomPad})`);

    xAxis
      .append('line')
      .attr('x1', yAxisLeftPad)
      .attr('y1', 0)
      .attr('x2', width)
      .attr('y2', 0)
      .style('stroke', '#ccc')
      .style('stroke-width', 1);

    xAxis.selectAll('text')
      .data(timeScale.ticks(xTick))
      .enter()
      .append('text')
      .text(d => {
        return timeFormat(d);
      })
      .attr('x', d => scaleMapper(d))
      .attr('y', xAxisBottomPad)
      .attr('transform', function () {
        return `translate(-${this.getBoundingClientRect().width / 2}, 0)`;
      })
      .attr('style', 'fill: #666; font-size: 14px; font-weight: 300;');

    xAxis.selectAll('line')
      .data(timeScale.ticks(xTick))
      .enter()
      .append('line')
      .attr('x1', d => scaleMapper(d))
      .attr('y1', 0)
      .attr('x2', d => scaleMapper(d))
      .attr('y2', -tickSize)
      .style('stroke', '#ccc')
      .style('stroke-width', 1);

    return [
      xAxis,
      scaleMapper
    ];
  };

  const drawYAxis = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, range: number[]) => {
    const yAxis = svg.append('g');

    const valueScale = d3.scaleLinear()
      .domain(range);

    const scaleMapper = valueScale.range([height - xAxisBottomPad - yRangePad, yRangePad]);

    yAxis.selectAll('text')
      .data(valueScale.ticks(yTick))
      .enter()
      .append('text')
      .text(d => Number(d).toString())
      .attr('x', yAxisLeftPad)
      .attr('y', d => scaleMapper(d))
      .attr('transform', function () {
        const rect = this.getBoundingClientRect();
        return `translate(-${rect.width}, ${rect.height/6})`;
      })
      .attr('style', 'fill: #666; font-size: 14px; font-weight: 300;');

    yAxis.selectAll('line')
      .data(valueScale.ticks(yTick))
      .enter()
      .append('line')
      .attr('x1', yAxisLeftPad)
      .attr('y1', d => scaleMapper(d))
      .attr('x2', yAxisLeftPad + tickSize)
      .attr('y2', d => scaleMapper(d))
      .style('stroke', '#ccc')
      .style('stroke-width', 1);

    yAxis
      .append('line')
      .attr('x1', yAxisLeftPad)
      .attr('y1', 0)
      .attr('x2', yAxisLeftPad)
      .attr('y2', height - xAxisBottomPad)
      .style('stroke', '#ccc')
      .style('stroke-width', 1);

    return [
      yAxis,
      scaleMapper
    ];
  }

  const drawPath = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: [string, number][],
    mapper: any[]
  ) => {
    const [xMapper, yMapper] = mapper;

    const points = [];

    const xyline = d3.line()
      .curve(d3.curveNatural) // 指定曲率
      .x(d => xMapper((+(d[0] as unknown as string) || 0) * 1000))
      .y(d => yMapper(d[1] as unknown as number));

    svg
      .append("path")
      .data([data])
      .attr('d', xyline as any)
      .attr('fill', 'none')
      .attr('stroke', '#6a99f9')
      .attr('stroke-width', 2);
      // .on('mouseenter', function () {
      //   d3.select(this)
      //     .transition()
      //     .duration(300)
      //     .attr('stroke', 'blue')
      //     .attr('stroke-width', 3);
      // })
      // .on('mouseleave', function () {
      //   d3.select(this)
      //     .attr('stroke', '#6a99f9')
      //     .attr('stroke-width', 2);
      // });
  };

  const drawEvents = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    events: { start_time: number }[],
    mapper: any[]
  ) => {
    const [xMapper, yMapper] = mapper;

    const container = svg.append('g');

    container.selectAll('line')
      .data(events)
      .enter()
      .append('line')
      .attr('x1', d => xMapper(d.start_time * 1000))
      .attr('y1', 0)
      .attr('x2', d => xMapper(d.start_time * 1000))
      .attr('y2', height - xAxisBottomPad)
      .attr('stroke', '#6a99f9')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '5,5');

    container.selectAll('circle')
      .data(events)
      .enter()
      .append('circle')
      .attr('cx', d => xMapper(d.start_time * 1000))
      .attr('cy', height - xAxisBottomPad)
      .attr('r', 5)
      .attr('fill', 'none')
      .attr('stroke', '#4e83f3')
      .attr('stroke-width', 2);
  };

  const showTooltips = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
    let tooltips: d3.Selection<SVGGElement, unknown, null, undefined> | null = null;
    let line: d3.Selection<SVGLineElement, unknown, null, undefined> | null = null;

    

    svg.on('mousemove', function (evt) {
      if (line) {
        line.remove();
      }

      tooltips = svg.append('g');
      line = tooltips.append('line')
        .attr('x1', evt.clientX)
        .attr('y1', 0)
        .attr('x2', evt.clientX)
        .attr('y2', height - xAxisBottomPad)
        .attr('stroke', '#333')
        .attr('stroke-width', 2);
    }).on('mouseleave', function (evt) {
      if (tooltips) {
        tooltips.remove();
      }
    });
  };

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const timeArr = Object.keys(data.metrics).map(t => +t);
    const timeRange = [(d3.min(timeArr) || 0) * 1000, (d3.max(timeArr) || 0) * 1000];
    const valueArr = Object.values(data.metrics);
    const valueRange = [(d3.min(valueArr) || 0), (d3.max(valueArr) || 0)];

    const metrics = Object.entries(data.metrics);

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const [, xScaleMapper] = drawXAxis(svg, timeRange);
    const [, yScaleMapper] = drawYAxis(svg, valueRange);

    // 画坐标系
    // 功能点：
    // 1. 计算宽高 => 确定数据可视区域
    // 2. 自适应伸缩
    // 3. 计算tick数量
    // 可配置项
    // formatter label的展示

    // 画数据线
    drawPath(svg, metrics, [xScaleMapper, yScaleMapper]);
    drawEvents(svg, data.events, [xScaleMapper, yScaleMapper]);

    showTooltips(svg);
  }, []);

  return (
    <div style={{ width, height }}>
      <svg ref={svgRef} style={{ overflow: 'visible' }} />
    </div>
  );
};
