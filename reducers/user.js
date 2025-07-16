import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, roles: [] },
};

export const userSlice = createSlice({
 name: 'user',

  initialState,
 reducers: {
  login: (state, action) => {
    state.value.token = action.payload.token;
    state.value.username = action.payload.username;
    state.value.roles = action.payload.roles;
  },
  logout: (state) => {
    state.value.token = null;
    state.value.username = null;
    state.value.roles = [];
  },
 },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;