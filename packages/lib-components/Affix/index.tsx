import React, { useEffect, useRef } from 'react';
import { usePersistCallback } from 'lib-hooks/usePersistCallback';

interface IProps {
  children?: React.ReactNode;
  targetID?: string; // dom id
  top?: number; // 高度数量
  zIndex?: string;
}

/**
 * 图钉📌 - 吸顶灯等功能实现
 */
const Affix: React.FC<IProps> = ({ children, targetID = 'root', top = 0, zIndex = '9' }) => {
  const containerRef = useRef<HTMLDivElement | null>();
  const placeholder = useRef<HTMLDivElement | null>();

  const handleScroll = usePersistCallback((evt: Event) => {
    if (!containerRef.current) {
      return;
    }

    const startY = (evt.srcElement as HTMLDivElement).offsetTop;
    const scrollTop = (evt.srcElement as HTMLDivElement).scrollTop;
    const clientY = (evt.srcElement as HTMLDivElement).getBoundingClientRect().top;

    const distance = containerRef.current.offsetTop - startY;

    if (scrollTop >= distance) {
      // 只有第一次需要修改fix
      if (!placeholder.current) {
        placeholder.current = containerRef.current.cloneNode(true) as HTMLDivElement;

        containerRef.current.parentElement?.appendChild(placeholder.current);

        Object.assign(containerRef.current.style, {
          width: `${containerRef.current.clientWidth}px`,
          position: 'fixed',
          top: `${clientY + top}px`,
          zIndex,
        });
        containerRef.current.className = 'affix-active';
      }
    } else {
      // 移除掉placeholder
      if (placeholder.current) {
        containerRef.current.parentElement?.childNodes.forEach(node => {
          if (node === placeholder.current) {
            containerRef.current?.parentElement?.removeChild(node);
          }
        });
        placeholder.current = null;
        Object.assign(containerRef.current.style, {
          width: '',
          position: '',
          top: '',
          zIndex: '',
        });
        containerRef.current.className = '';
      }
    }
  });

  useEffect(() => {
    const dom = document.querySelector(targetID);

    dom?.addEventListener('scroll', handleScroll);

    return (): void => dom?.removeEventListener('scroll', handleScroll);
  }, [targetID]);

  return <div ref={ref => (containerRef.current = ref)}>{children}</div>;
};

export default Affix;
