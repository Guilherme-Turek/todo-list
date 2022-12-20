import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: 'Completed' | 'Erased' | 'Pendent';
  username: string;
}

const adapterTask = createEntityAdapter<Task>({
  selectId: item => item.id
});

export const { selectAll: selectTasks, selectById: selectTasksById } = adapterTask.getSelectors(
  (state: RootState) => state.tasks
);

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState: adapterTask.getInitialState(),
  reducers: {
    addTask: adapterTask.addOne,
    editTask: adapterTask.updateOne,
    deleteTask: adapterTask.removeOne
  }
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
