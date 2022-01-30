import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default () => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    // const path = d3.path();
    // path.moveTo(x, y);
    // path.closePath();
    // path.lineTo(x, y);
    // path.quadraticCurveTo(cpx, cpy, x, y); // 二次曲线
    // path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y); // 贝塞尔曲线
    // path.arcTo(x1, y1, x2, y2, radius); // 圆弧
    // path.arc(x, y, radius, startAngle, endAngle[, anticlockwise]); // 根据圆心 弧度 起始角度 顺逆时针方向画弧
    // path.rect(x, y, w, h);
    // path.toString();

    if (!svgRef.current) {
      return;
    }

    const line = d3.line(); // 生成data => path的工厂函数
    const pathStr = line([[0, 20], [50, 30], [100, 50], [200, 60], [300, 90]]);
    d3.select(svgRef.current)
      .append('path')
      .attr('d', pathStr)
      .style('fill', 'green')
      .style('stroke', '#aaa');
  }, []);

  return (
    <div>
      <h4>Path API</h4>
      <svg ref={svgRef} width="300" height="90" />
    </div>
  );
}
