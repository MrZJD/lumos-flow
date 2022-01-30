import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default () => {
  useEffect(() => {
    // d3 array api
    // * d3.min(array)
    // * d3.max(array)
    // * d3.extent(array) // 最大最小值
    // * d3.sum(array)
    // * d3.mean(array) // 平均值
    // * d3.quantile(array)  // 分位值
    // * d3.variance(array) // 方差
    // * d3.deviation(array) // 标准偏差
  }, []);

  const dataSource = [20, 40, 50, 80, 100];

  return (
    <div>
      <h4>Array Data API</h4>
      <p>DataSource: {JSON.stringify(dataSource)}</p>
      <ul>
        <li><pre><code>d3.min(dataSource) = {d3.min(dataSource)}</code></pre></li>
        <li><pre><code>d3.max(dataSource) = {d3.max(dataSource)}</code></pre></li>
        <li><pre><code>d3.extent(dataSource) = {JSON.stringify(d3.extent(dataSource))}</code></pre></li>
        <li><pre><code>d3.sum(dataSource) = {d3.sum(dataSource)}</code></pre></li>
        <li><pre><code>d3.mean(dataSource) = {d3.mean(dataSource)} // 平均值</code></pre></li>
        <li><pre><code>d3.mean(dataSource, 0.5) = {d3.quantile(dataSource, 0.5)} // 分位值</code></pre></li>
        <li><pre><code>d3.variance(dataSource) = {d3.variance(dataSource)} // 方差</code></pre></li>
        <li><pre><code>d3.deviation(dataSource) = {d3.deviation(dataSource)} // 标准偏差</code></pre></li>
      </ul>

      <h4>Collection API</h4>
      <h4>Selection API</h4>

      <a href="https://github.com/d3/d3/blob/main/API.md" rel="noopenner noreferrer">更多api参考</a>
    </div>
  );
};
