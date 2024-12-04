import { ADD_TASK, CHANGE_TASK_STATUS } from "./actions";

const initialState = {
  columns: {
    "To Do": [],
    "In Progress": [],
    "Completed": [],
  },
};

export const columnOrder = ["preparation", "dayOfTheEvent", "eventClosing", "empty"];

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const { column, task } = action.payload;
      return {
        ...state,
        columns: {
          ...state.columns,
          [column]: [...state.columns[column], task],
        },
      };
    }

    case CHANGE_TASK_STATUS: {
      const { fromColumn, toColumn, taskId } = action.payload;

      if (!state.columns[fromColumn]) {
        console.error(`Column '${fromColumn}' does not exist`);
        return state;
      }
      if (!state.columns[toColumn]) {
        console.error(`Column '${toColumn}' does not exist`);
        return state;
      }

      const taskToMove = state.columns[fromColumn].find((task) => task.id === taskId);

      if (!taskToMove) {
        console.error(`Task with ID ${taskId} not found in column '${fromColumn}'`);
        return state;
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromColumn]: state.columns[fromColumn].filter((task) => task.id !== taskId),
          [toColumn]: [...state.columns[toColumn], taskToMove],
        },
      };
    }

    default:
      return state;
  }
};
