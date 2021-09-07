# 常用布局效果

## 目标

* 布局相关代码nocode

## 布局列表

### 自适应布局

* 居中
  * 水平/垂直居中
* 左右两侧
* 左侧固定/右侧自适应
* 上方固定/下方固定滚动

### 流式布局

### 网格布局

### 固定布局

## 组件/方案

**提供组件**

```tsx
import { LRBox, CenterBox, FlexBox } from 'lib-components/Layout/Flex';

export default () => {
  return (
    <div>
      <LRBox
        left={}
        right={}
      />
    </div>
  )
};
```

**提供方法**

> 某些场景下我们需要生成class或者style来提供/覆盖已有组件的样式

```tsx
import { Spin } from '@arco-design/web-react';
import { lfBox, centerBox, flexBox, getStyle } from 'lib-components/Layout/style';

```
