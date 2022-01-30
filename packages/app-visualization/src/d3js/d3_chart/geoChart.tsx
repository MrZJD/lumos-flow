import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { geoPath, geoMercator } from 'd3-geo';
import * as togojson from 'topojson-client';
import './geoChart.css';

// geo数据
// https://github.com/topojson/us-atlas

const config = {
  width: 600,
  height: 400,
};

export default () => {
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const proj = geoMercator()
      .center([-70, 45]) // 经纬度
      .scale(260);

    const svg = d3.select(svgRef.current)
      .attr('width', config.width)
      .attr('height', config.height);
    
    const path = d3.geoPath(proj);

    d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json').then((data: any) => {
      svg.append("g")
        .selectAll("path")
        .data((togojson.feature(data, data.objects.states) as any).features as any)
        .enter()
        .append("path")
        .attr("class", function(d) { return "state-" + d.id; })
        .attr("d", path as any);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <svg id="geo-chart" ref={svgRef} />
  )
};
