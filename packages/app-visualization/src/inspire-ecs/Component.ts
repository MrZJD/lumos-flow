import { getConstructor } from "./helper";

export type ComponentClass = typeof Component;

export default class Component<T> {
  static defaultValue: any;

  payload: T | undefined;

  constructor(payload: T) {
    this.setValue(payload);
  }

  setValue(payload: T) {
    this.payload = payload;
  }

  copy() {}

  reset() {}

  getValue(): T {
    return this.payload || getConstructor(this).defaultValue;
  }
}
