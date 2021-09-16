import React, { Children, cloneElement } from 'react';
import styles from './styles.module.scss';
import useControlled from 'lib-hooks/useControlled';
import { cx } from 'lib-utils/css';

export * from './Item';

interface IProps {
  children?: React.ReactNode;
  activeKey?: string;
  onChange?: (key: string) => void;
  defaultKey?: string;
}

const defendChild = (
  child: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined,
  index: number,
  handler: (element: React.ReactElement) => JSX.Element) => {
  if (['boolean', 'undefined', 'string', 'number'].includes(typeof child) || child === null) {
    return child;
  }
  return handler(child as React.ReactElement);
}

const Tab: React.FC<IProps> = ({ children, activeKey, onChange, defaultKey }) => {
  const [active, setActive] = useControlled(activeKey, onChange, defaultKey);

  return (
    <div className={styles.tab}>
      <div className={styles.tabHeader}>
        {
          Children.map(children, (child, index) => {
            return defendChild(child, index, (element) => (
              <div
                className={cx(styles.tabItem, { [styles.active]: element?.props?.tabKey === active })}
                onClick={() => setActive(element?.props?.tabKey)}
              >
                {element?.props?.title}
              </div>
            ));
          })
        }
      </div>
      <div className={styles.tabContent}>
      {
          Children.map(children, (child, index) => {
            return defendChild(child, index, (element) => (
              cloneElement(element, { active: element.props.tabKey === active })
            ));
          })
        }
      </div>
    </div>
  );
};

export default Tab;
