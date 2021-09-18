import { useRef } from 'react';
import { usePersistCallback } from '../usePersistCallback';
import { byPath } from 'lib-utils/object/byPath';

// 表单联动配置
export interface IFormEffect {
  fields: string[]; // field paths
  onChange: (...args: any[]) => void; // 字段变化时的联动配置
  trigger?: (currValue, prevValue) => boolean; // 自定义对比变化字段
}

interface IProps {
  initValues: Record<string, any>;
  setValues: (vals: Record<string, any>) => void;
  getValues: () => void;
  effects?: IFormEffect[];
}

const getDeps = (states, deps) => {
  return deps.map(path => byPath(states, path));
};

const shadowEqual = (depsA, depsB) => {
  if (!depsA || !depsB) {
    return false;
  }
  if (depsA.length !== depsB.length) {
    return false;
  }
  for (let i = 0, len = depsA.length; i < len; i++) {
    if (depsA[i] !== depsB[i]) {
      return false;
    }
  }
  return true;
};

export const useForm = ({ initValues, setValues, getValues, effects }: IProps) => {
  const prevValues = useRef(initValues);

  const onValuesChange = usePersistCallback((values) => {
    // interceptors?.forEach(({ fields, onChange }) => {
    //   onChange(fields.map(path => byPath(values, path)));
    // });

    // 这里应该是只有变化的节点才需要触发change

    // values只包含变化的字段
    effects?.forEach(({ fields, onChange, trigger }) => {
      const prev = getDeps(prevValues, fields);
      const curr = getDeps(values, fields);

      if (trigger && trigger(values, prevValues)) {
        onChange(curr, prev);
      }

      if (!trigger && !shadowEqual(prev, curr)) {
        onChange(curr, prev);
      }
    });

    prevValues.current = values;
  });

  return {
    onValuesChange
  };
};

export default useForm;
