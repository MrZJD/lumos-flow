/**
 * 并发限流 
 */

import EventEmitter from "../EventEmitter";

type Task = () => Promise<any>;

export function createConcurrBox(limit: number) {
  const line: { task: Task; taskID: number }[] = [];

  const messager = new EventEmitter();

  enum ConcurrEvent {
    TASK_FINISHED = 'TASK_FINISHED',
    HAND_OVER = 'HAND_OVER',
  }

  let concurrent = 0;
  let flagID = 0;

  messager.listen(ConcurrEvent.TASK_FINISHED, () => {
    const topTask = line.shift();

    if (!topTask) {
      return;
    }

    messager.fire(`${ConcurrEvent.HAND_OVER}_${topTask.taskID}`, scheduler(topTask.task));
  });

  // scheduler调度任务
  const scheduler = (task: Task) => {
    if (concurrent < limit) {
      concurrent++;
      return task().finally(() => {
        concurrent--;
        messager.fire(ConcurrEvent.TASK_FINISHED);
      });
    }

    const taskID = ++flagID;

    const waitTask = {
      task,
      taskID
    };

    line.push(waitTask);

    return new Promise((res, rej) => {
      messager.once(`${ConcurrEvent.HAND_OVER}_${taskID}`, (payload) => {
        res(payload)
      });
    });
  };

  return scheduler;
}

export default createConcurrBox;
