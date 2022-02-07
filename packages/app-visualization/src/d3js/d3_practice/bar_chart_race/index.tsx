import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import datasource from './data.csv';
import { InternMap, Transition } from 'd3';

interface IDataRow {
  date: string;
  name: string;
  category: string;
  value: string;
}

export default () => {
  const svgContainer = useRef<SVGSVGElement>();

  const config = {
    width: 800,
    height: 430,
    n: 12,
    margin: { top: 16, right: 6, bottom: 6, left: 0 },
    barSize: 36,
    duration: 250,
  };

  const viewHeight = config.margin.top + config.barSize * config.n + config.margin.bottom;

  const rank = (names: Set<string>, getValue: (a: string) => number) => {
    const data = Array.from(names, name => ({ name, value: getValue(name) }));

    data.sort((a, b) => d3.descending(a.value, b.value));

    for (let i = 0; i < data.length; i++) {
      data[i].rank = Math.min(config.n, i)
    }

    return data;
  }

  const x = d3.scaleLinear([0, 1], [config.margin.left, config.width - config.margin.right]);

  const y = d3.scaleBand()
    .domain(d3.range(config.n + 1) as any)
    .rangeRound([config.margin.top, config.margin.top + config.barSize * (config.n + 1 + 0.1)])
    .padding(0.1);
  
  const colorFactory = (data: any[]) => {
    const scale = d3.scaleOrdinal(d3.schemeTableau10);
    if (data.some(d => d.category !== undefined)) {
      const categoryName = new Map(data.map(d => [d.name, d.category]));
      scale.domain(categoryName.values());
      return (d: any) => scale(categoryName.get(d.name));
    }
    return (d: any) => d.scale(d.name);
  }

  const loaddata = async (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
    const data = await d3.csv(datasource) as IDataRow[];

    const names = new Set(data.map(item => item.name));
    const datavalues = Array.from(
      d3.rollup(data, ([d]) => +d.value, d => d.date, d => d.name)
    ).map(
      ([date, data]) => [new Date(date).getTime(), data]
    ).sort(
      ([a], [b]) => d3.ascending(a as number, b as number)
    );

    const keyframes = [];
    const k = 10; // 把时间点拆成动画需要的一帧一帧的数据

    type TPair = [number, InternMap<string, string>];
    let ka: number, a: InternMap<string, string>, kb: number, b: InternMap<string, string>;
    for ([[ka, a], [kb, b]] of (d3.pairs(datavalues) as unknown as [TPair, TPair][])) {
      for (let i = 0; i < k; ++i) {
        const t = i / k;
        keyframes.push([
          new Date(ka * (1 - t) + kb * t),
          rank(names, name => (
            (a.get(name) as any as number || 0) * (1 - t) +
            (b.get(name) as any as number || 0) * t)
          )
        ]);
      }
    }
    // @ts-ignore
    keyframes.push([new Date(kb), rank(names, name => b.get(name) || 0)]);

    const nameframes = d3.groups<string, {name: string, value: string}>(keyframes.flatMap(([, data]) => data as []), d => (d as any).name);
    const prev = new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
    const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));

    const color = colorFactory(data);

    const barsFactory = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll();
  
      return ([date, data]: [string, Array<{name: string, value: string}>], transition: Transition<any, any, any, any>) => {
        bar = bar
          .data(data.slice(0, config.n), d => d.name)
          .join(
            enter => enter.append('rect')
              .attr('fill', color)
              .attr('height', y.bandwidth())
              .attr("x", x(0))
              .attr("y", d => y((prev.get(d) || d).rank))
              .attr("width", d => x((prev.get(d) || d).value) - x(0)),
            update => update,
            exit => exit.transition(transition)
              .remove()
              .attr("y", d => y((next.get(d) || d).rank))
              .attr("width", d => x((next.get(d) || d).value) - x(0))
          )
          .call(bar =>  bar.transition(transition)
            .attr("y", d => y(d.rank))
            .attr("width", d => x(d.value) - x(0))
          );
      }
    };

    const updateBars = barsFactory(svg);

    for (const keyframe of keyframes) {
      const transition = svg.transition()
          .duration(config.duration)
          .ease(d3.easeLinear);
  
      // Extract the top bar’s value.
      x.domain([0, keyframe[1][0].value]);
  
      // updateAxis(keyframe, transition);
      updateBars(keyframe, transition);
      // updateLabels(keyframe, transition);
      // updateTicker(keyframe, transition);
      // svg.attr('viewbox', [0, 0, config.width, viewHeight + 200]);
  
      // invalidation.then(() => svg.interrupt());
      await transition.end();
    }
  };

  useEffect(() => {
    if (!svgContainer.current) {
      return;
    }

    const svg = d3.select(svgContainer.current);

    svg.attr('width', config.width)
      .attr('height', config.height)
      .attr('viewBox', [0, 0, config.width, viewHeight])
      .attr('preserveAspectRatio', 'xMinYMid meet');

    (async () => {
      await loaddata(svg);
    })();
  }, []);

  return (
    <div>
      <svg ref={svgContainer} />
    </div>
  );
}
