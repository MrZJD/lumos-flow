import Component, { ComponentClass } from './Component';
import { getClassStr } from './helper';

export type EntityClass = typeof Entity;

export default class Entity {
  _components: Record<string, Component<any>> = {};

  attach<T>(component: Component<T>) {
    const flag = getClassStr(component);

    if (!flag) {
      console.error('[Entity] attch component error: the flag of Component is not exist |', flag);
      return this;
    }

    if (this._components[flag]) {
      console.warn('[Entity] attch component warning: the flag of Component is already exist |', flag);
      return this;
    }

    this._components[flag] = component;

    return this;
  }

  getComponent<T extends abstract new (...args: any) => any>(ComponentCls: T): InstanceType<T> | undefined {
    const flag = ComponentCls.toString();

    return this._components[flag] as InstanceType<T> | undefined;
  }
}
