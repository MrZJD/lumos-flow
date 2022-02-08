# 前端可视化

可视化分为以下几个方向进行讨论

* 基础渲染库
* 数据可视化
* 物理世界（2d & 3d render + 物理引擎）

## 基础渲染库

* [d3js](https://d3js.org/)
* [pixijs](https://pixijs.com/)
* [threejs](https://threejs.org/)

## 数据可视化

* [d3js](https://d3js.org/)
* [antv](https://antv.vision/)
* [echarts](https://echarts.apache.org/zh/index.html)

## Entity Component System framework 实体组件系统

> 设计系统：把系统进行 World = System + Entity > Component的拆分。
> * World由若干Entity + System组成
> * Component拥有数据和状态
> * Entity由若干组件组成
> * System可以获取Entity上组件的数据 读取或修改

**ECS in JS**

* [ecsy](https://ecsy.io/docs/#/)
* [bitECS](https://ecsy.io/docs/#/)

**阅读**

![ecsy framework](https://discourse-prod-uploads-81679984178418.s3.dualstack.us-west-2.amazonaws.com/original/3X/8/d/8d6687349a7209816ffca656c43a9c4ae85284b4.png)

* [ecs & ecsy](https://discourse.mozilla.org/t/difference-between-ecs-and-ecsy/65229/2)

## 物理引擎

**2d for JS**

* [matter.js](https://brm.io/matter-js/docs/)
* [box2d.js](https://github.com/kripken/box2d.js)
* [SAT.js - 简单的碰撞检测](https://github.com/jriecken/sat-js)

**3d for JS**

* [cannon.js](https://github.com/schteppe/cannon.js)
* [ammo.js (Bullet)](https://github.com/kripken/ammo.js/)
* [sprite.js](http://spritejs.com/#/)

## HTML5 Game framework

* [phaser.js](https://github.com/phaserjs/phaser)
