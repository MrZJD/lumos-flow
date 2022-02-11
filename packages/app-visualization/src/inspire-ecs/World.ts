// import { System } from "ecsy";
import Entity, { EntityClass } from "./Entity";
import System, { SystemClass } from "./System";
import { getClassStr } from "./helper";

export default class World {
  _systems: Record<string, System> = {};
  
  _entities: Record<string, Entity[]> = {};
  
  addSystem(...args: (SystemClass | [SystemClass, string])[]) {
    args.forEach(Sys => {
      if (Array.isArray(Sys)) {
        this._systems[Sys[1]] = new Sys[0](this);
        return;
      }

      this._systems[Sys.toString()] = new Sys(this);
    });
  }

  addEntity<T extends Entity>(...args: T[]) {
    args.forEach(entity => {
      const flag = getClassStr(entity);

      if (!flag) {
        console.error('[World] addEntity error: the flag of Entity is not exist |', Object.getPrototypeOf(entity).constructor.toString());
        return;
      }

      if (!this._entities[flag]) {
        this._entities[flag] = [];
      }

      this._entities[flag].push(entity);
    });
  }

  getEntity(EntityCls: EntityClass) {
    return this._entities[EntityCls.toString()] || [];
  }

  execute(delta: number, current: number) {
    Object.values<System>(this._systems).forEach((sys) => {
      sys.execute(delta, current);
    });
  }

  bootstrap() {
    let lastTime = performance.now();

    const loop = () => {
      const now = performance.now();
      const delta = now - lastTime;

      lastTime = now;

      this.execute(delta, now);
      requestAnimationFrame(loop);
    };

    loop();
  }
}
