import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';

export interface User {
  username: string;
  password: string;
  logged: boolean;
}

const adapterUser = createEntityAdapter<User>({
  selectId: item => item.username
});

export const { selectAll: selectUsers, selectById: selectUsersById } = adapterUser.getSelectors(
  (state: RootState) => state.users
);

const userSlice = createSlice({
  name: 'user',
  initialState: adapterUser.getInitialState(),
  reducers: {
    addUser: adapterUser.addOne,
    login(state, { payload: { username } }: PayloadAction<{ username: string }>) {
      adapterUser.updateOne(state, { id: username, changes: { logged: true } });
    },
    logoff(state, action: PayloadAction<{ username: string }>) {
      adapterUser.updateOne(state, { id: action.payload.username, changes: { logged: false } });
    }
  }
});

export const { addUser, login, logoff } = userSlice.actions;
export default userSlice.reducer;
