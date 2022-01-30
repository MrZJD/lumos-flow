import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default () => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    // d3.scaleLinear(); // 连续线性标度
    // d3.scaleIdentity(); // 根据指定创建线性标度
    // d3.scaleTime(); // 线性时间标度
    // d3.scaleLog(); // 对数标度
    // d3.scaleSqrt(); // 平方根
    // d3.scalePow(); // 指数标度
    // d3.scaleSequential();  // 由插值函数确定的顺序标度
    // d3.scaleQuantize(); // 离散输出范围的量化比例
    // d3.scaleQuantile(); // 
    // d3.scaleThreshold(); // 输入数据映射到离散输出范围
    // d3.scaleBand(); // 输出范围是连续和数字之外，波段标度类似于序数标度
    // d3.scalePoint(); // 构造一个点刻度
    // d3.scaleOrdinal(); // 构造一个序数比例，其中输入数据包含字母并映射到离散数字输出范围

    // ======> 复杂转换函数有待确认效果

    // domain => 输入数据的最大最小值区间
    // range => 输出范围 将输入值映射到的目标区间

    if (!svgRef.current) {
      return;
    }

    const data = [100, 200, 300, 400, 800, 0];
    const dataDomain = [d3.min(data) || 0, d3.max(data) || 100]; // [0, 400] // scale input
    const dataRange = [10, 400]; // scale output

    const scale = d3.scaleLinear()
      .domain(dataDomain)
      .range(dataRange);

    const g = d3.select(svgRef.current)
      .attr('width', 500)
      .attr('height', 150)
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${20 * i})`)

    g.append('rect')
      .attr('width', d => scale(d)) // => 这里是把domain => 映射到range的地方
      .attr('height', 19)
      .style('fill', '#999');
  }, []);

  return (
    <div>
      <h4>Scale API</h4>
      <svg ref={svgRef} />
    </div>
  );
}
