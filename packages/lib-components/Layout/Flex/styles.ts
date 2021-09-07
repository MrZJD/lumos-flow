import { CSSProperties } from 'react';

export const lfBox = 'lib-flex-lf';
export const centerBox = 'lib-flex-center';
export const flBox = 'lib-flex';

const styleConfig = new Map<string, CSSProperties>();

styleConfig.set(lfBox, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

styleConfig.set(centerBox, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

styleConfig.set(flBox, {
  display: 'flex'
});

export const getStyle = (type): CSSProperties => {
  return styleConfig[type] || {};
};
