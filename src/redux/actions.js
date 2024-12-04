export const ADD_TASK = "ADD_TASK";
export const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS";


export const addTask = (column, task) => ({
  type: ADD_TASK,
  payload: { column, task },
});


export const changeTaskStatus = (fromColumn, toColumn, taskId) => ({
  type: CHANGE_TASK_STATUS,
  payload: { fromColumn, toColumn, taskId },
});