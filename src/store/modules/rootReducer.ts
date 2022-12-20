import { combineReducers } from '@reduxjs/toolkit';
import users from './usersSlice/usersSlice';
import tasks from './tasksSlice/tasksSlice';

export default combineReducers({ users, tasks });
