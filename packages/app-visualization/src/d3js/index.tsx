import React from 'react';

// entry
import DataBinding from './data_binding';
import BasicSVG from './d3_svg';
import BarChart from './d3_chart/barChart';
import GeoChart from './d3_chart/geoChart';
import D3Data from './d3_data';
import D3Path from './d3_draw/path';
import D3Scale from './d3_draw/scale';
import D3Axis from './d3_draw/axis';
import D3Shape from './d3_draw/shape';
import D3Interaction from './d3_interaction';
import BarChartRace from './d3_practice/bar_chart_race';

export default () => {
  return (
    <div style={{ paddingBottom: '50%' }}>
      <h2>D3.js</h2>

      <h3 id="data-binding">Data Binding</h3>
      <DataBinding />

      <h3 id="basic-svg">basic SVG</h3>
      <BasicSVG />

      <h3 id="bar-chart-section">BarChart</h3>
      <BarChart />

      <h3 id="geo-chart-section">GeoChart</h3>
      <GeoChart />

      <h3 id="array-api-section">D3 Data Api</h3>
      <D3Data />

      <h3 id="draw-api-section">D3 Draw Api</h3>
      <D3Path />
      <D3Scale />
      <D3Axis />
      <D3Shape />

      <h3 id="interaction-api-section">D3 interaction API</h3>
      <D3Interaction />

      <h3 id="bar-chart-race">Bar Chart Race</h3>
      <BarChartRace />
    </div>
  );
}
