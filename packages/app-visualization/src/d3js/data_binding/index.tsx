import * as d3 from 'd3';
import React, { useEffect } from 'react';

// 4种 Dataing Binding API
// datum() / data() / enter() / exit();
// dom API
// select() / selectAll()
// append() / remove()
// text() / html() / style() / attr()
// classed() // 增加删除check

// -----------------------------------

export default () => {
  useEffect(() => {
    // datum()
    // 为单个元素设置数据值

    d3.select('#data-binding p')
      .datum(50)
      .text(d => {
        return `在一个现有的p元素上分配数据 ${d}`;
      });

    d3.select('#data-binding div')
    .datum(100)
    .append('p')
    .text(d => {
      return `在一个新创建的p元素上分配数据 ${d}`;
    });
  }, []);

  useEffect(() => {
    // data();
    // 将数据集分配给dom元素集合
    // enter();
    // 输出之前不在dom元素集合中的数据项集
    // exit();
    // 输出不在数据项集的dom元素集合

    // d3.select('#data-binding .list')
    //   .selectAll('li') // li[0]-li[2]
    //   .data([10, 20, 30, 40, 50])
    //   .text(d => {
    //     return `在已存在的元素上分配数据 ${d}`;
    //   })
    //   .enter() // => [40, 50]
    //   .append("li") // li[3]-li[4]
    //   .text(d => {
    //     return `在新增的元素上分配数据 ${d + 1}`;
    //   });

    d3.select('#data-binding .list')
      .selectAll('li')
      .data([10, 20])
      .text(d => {
        return `在已存在的元素上分配数据 ${d}`;
      })
      .exit()
      .remove();
  }, []);

  return (
    <div id="data-binding">
      <p></p>
      <div></div>
      <ul className="list">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
