import React from 'react';
import FlexBox from '../FlexBox';

export interface ILRBoxProps {
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const LRBox: React.FC<ILRBoxProps> = ({ className, left, right }) => {
  return (
    <FlexBox className={className}>
      <FlexBox inline>
        {left}
      </FlexBox>
      <FlexBox inline>
        {right}
      </FlexBox>
    </FlexBox>
  );
}

export default LRBox;
