import React from 'react';
import { cx } from 'lib-utils/css';

import 'styles.scss';

export interface IFlexBoxProps {
  className?: string;
  inline?: boolean;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  children?: React.ReactNode;
}

export const FlexBox: React.FC<IFlexBoxProps> = ({
  className,
  inline = false,
  align = 'center',
  justify = inline ? 'unset' : 'space-between',
  children
}) => {
  return (
    <div
      className={cx(['lib-flbox', className], {'lib-flbox-inline': inline})}
      style={{ alignItems: align, justifyContent: justify }}
    >
      {children}
    </div>
  );
}

export default FlexBox;
