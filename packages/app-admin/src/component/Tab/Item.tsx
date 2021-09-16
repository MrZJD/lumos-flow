import React, {} from 'react';

interface IProps {
  children?: React.ReactNode;
  title?: string;
  active?: boolean;
  tabKey: string;
}

export const Item: React.FC<IProps> = ({ children, title, active }) => {
  if (!active) {
    return null;
  }

  return <>{children}</>;
};

export default Item;
