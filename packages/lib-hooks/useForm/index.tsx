import {} from 'react';
import { usePersistCallback } from '../usePersistCallback';
import { byPath } from 'lib-utils/object/byPath';

// 表单联动配置
export interface IFormInterceptor {
  fields: string[]; // field paths
  onChange: (...args: any[]) => void; // 字段变化时的联动配置
}

interface IProps {
  initValues: Record<string, any>;
  setValues: (vals: Record<string, any>) => void;
  getValues: () => void;
  interceptors?: IFormInterceptor[];
}

export const useForm = ({ initValues, setValues, getValues, interceptors }: IProps) => {
  const onValuesChange = usePersistCallback((values) => {
    // interceptors?.forEach(({ fields, onChange }) => {
    //   onChange(fields.map(path => byPath(values, path)));
    // });

    // 这里应该是只有变化的节点才需要触发change

    // values只包含变化的字段
  });

  return {
    onValuesChange
  };
};

export default useForm;
