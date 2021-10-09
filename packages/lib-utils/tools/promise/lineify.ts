import { EventEmitter } from 'events';
import { uniqueId } from 'lodash';

function getWaitPromise<T>(signal: EventEmitter, signalId: string): Promise<T> {
  return new Promise((resolve, reject) => {
    signal.once(signalId, (payload, err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload);
    });
  });
}

/**
 * 将请求串行化
 * @param {() => Promise<any>} request 请求方法
 * @param {number} maxSerialCount 最大并行数
 * @return {() => Promise<any>} 代理方法
 */
export function lineify<ReqT extends [], ResT>(request: (...args: ReqT) => Promise<ResT>, maxSerialCount: number) {
  // * 记录正在请求的数量
  let runningCount = 0;
  // * 等待队列
  const waitline: Array<{
    params: ReqT;
    signalId: string;
  }> = [];
  // * 通知器
  const signal = new EventEmitter();

  function execution() {
    // 大于并行最大数量
    if (runningCount >= maxSerialCount) {
      return;
    }
    if (waitline.length === 0) {
      return;
    }

    runningCount += 1;
    const config = waitline.shift();

    // @ts-ignore need more types
    request(config.params)
      .then((payload: any) => {
        signal.emit(config!.signalId, payload);
      })
      .catch((err: Error) => {
        signal.emit(config!.signalId, null, err);
      })
      .finally(() => {
        runningCount -= 1;
        execution();
      });
  }

  return async (params: ReqT): Promise<ResT> => {
    // 放入队列中
    const signalId = uniqueId();
    waitline.push({ params, signalId });

    // 执行
    execution();

    // 返回一个pending的状态
    return getWaitPromise<ResT>(signal, signalId);
  };
}

export default lineify;
