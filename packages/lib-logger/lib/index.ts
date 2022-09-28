import { getStack } from "./callstack";

function run() {
  getStack();
}

run();

export default {
  info: (ctx, ...msgs) => {
    const stackError = new Error();
    ctx.logger.info('')
  }
};
