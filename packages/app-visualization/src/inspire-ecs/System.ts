import World from "./World";

export type SystemClass = typeof System;

export default class System {
  world: World;

  constructor(world: World) {
    this.world = world;
  }

  execute(delta: number, current: number) {}
}
