
/**
 * 测量文本的大小
 * @params text html string
 */
export const mearsureText = (htmlStr: string): DOMRect => {
  const container = document.createElement('div');
  container.id = 'MEARSURE_CONTAINER';

  container.innerHTML = htmlStr;
  container.style.position = 'fixed';
  container.style.top = '100%';

  document.body.appendChild(container);

  const result = container.getBoundingClientRect();

  document.body.removeChild(container);

  return result;
};
