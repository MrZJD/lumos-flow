import { logger } from './module';
import { merge } from 'lib-utils/object/merge';

export function render() {
  logger('render');

  logger(merge('a', 'b'));
}

export default render;
