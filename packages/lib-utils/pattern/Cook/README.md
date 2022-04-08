# Cook 数据处理

## 场景1. 配置表

> 如需要根据status渲染节点的状态

```ts
import { invert } from 'lodash';

const config = {
  error: 'red',
  success: 'green',
  warn: 'orange',
  info: 'blue'
};

export default {
  data: config,
  defaultValue: 'gray',
  vData: invert(config),
  vDefaultValue: undefined
};
```

## 场景2. 组装数据

```ts
const datad = useApi(() => {});

const useDataFlow = () => {

  const dealed = useMemo(() => {
    // calc
    // 一系列函数式操作
    return DataFlow(rawData)
      .keys()
      .transform(raw => {
        return {};
      });

  }, [rawData]);

  return {
    dealed
  };
};
```
