import * as d3 from 'd3';

d3.select('head')
  .append('style')
  .html(`
    .arc text {
      font: 12px arial;
      text-anchor: middle;
    }
    .arc path {
      stroke: #fff;
    }
    .title {
      fill: green;
      font-weight: italic;
    }
  `);

const config = {
  width: 300,
  height: 300,
};

const curry = <T extends { value: number }, S extends T & { valueOf: () => number; }>(payload: T): S => {
  payload.valueOf = function() { return this.value; };
  return payload as unknown as S;
}

const data = [
  curry({
    name: 'beijing',
    value: 10
  }), 
  curry({
    name: 'shanghai',
    value: 20
  }),
  curry({
    name: 'guangzhou',
    value: 30
  }),
  curry({
    name: 'shenzhen',
    value: 40
  })
];

const radius = Math.min(config.width, config.height) / 2;

const svg = d3.select('body')
  .append('svg')
  .attr('width', config.width)
  .attr('height', config.height);

const g = svg.append('g')
  .attr('transform', `translate(${config.width / 2}, ${config.height / 2})`);

const color = d3.scaleOrdinal(['gray', 'green', 'brown', 'orange']);

const pie = d3.pie()
  .value((d) => d.valueOf());

const path = d3.arc()
  .outerRadius(radius - 10)
  // .innerRadius(0); // pie
  .innerRadius(80); // ring

const label = d3.arc()
  .outerRadius(radius)
  .innerRadius(radius - 80);

const arc = g.selectAll('.arc')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'arc');

arc.append('path')
  .attr('d', path as any)
  .attr("fill", function(d) { return color(d.data.valueOf()); });

arc.append('text')
  .attr('transform', function(d) {
    return `translate(${label.centroid(d)})`
  })
  .text(d => d.data.name)
