import * as d3 from 'd3';
import data from './data.csv';

d3.select('head')
  .append('style')
  .html(`
    .line {
      fill: none;
      stroke: green;
      stroke-width: 1.5px;
    }
  `);

const config = {
  margin: [20, 20, 30, 50],
  width: 960,
  height: 500
};

const rw = config.width - config.margin[1] - config.margin[3];
const rh = config.height - config.margin[0] - config.margin[2];

const svg = d3.select('body')
  .append('svg')
  .attr('width', config.width)
  .attr('height', config.height)
  .append('g')
  .attr('transform', `translate(${config.margin[3]}, ${config.margin[0]})`);

interface IData { x: number; y: number; };

d3.csv<IData>(data, (row) => {
  const data = row as { year: string; population: string; };

  return {
    x: new Date(data.year).getTime(),
    y: data.population
  } as any;
}).then((data) => {
  // range
  const x = d3.scaleTime().range([0, rw]);
  const y = d3.scaleLinear().range([rh, 0]);

  const xyline = d3.line()
    .x(d => x((d as unknown as IData).x))
    .y(d => y((d as unknown as IData).y));

  const xVal = d3.extent(data, d => d.x) as number[];
  const yMax = d3.max(data, d => d.y) || 0;

  x.domain(xVal);
  y.domain([0, yMax]);
  
  svg
    .append("path")
    .data([data])
    .attr("class", 'line')
    .attr("d", xyline as any);
  
  // y axis
  svg.append("g")
    .attr("transform", "translate(0," + rh + ")")
    .call(d3.axisBottom(x));

  // x axis
  svg.append("g")
    .call(d3.axisLeft(y));

}).catch(err => {
  console.error(err);
})
