import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { type IUserAPI } from "@/types/api/userApiInterface";
import { type IUser } from "@/types/redux/userInterface";

const initialState: IUser = {
 authenticated: false
} as IUser;

const userReducer = createSlice({
 name: "user",
 initialState,
 reducers: {
  setUser: (_state, { payload }: PayloadAction<IUserAPI>) => {
   return {
    ...payload,
    authenticated: true
   };
  },
  resetUser: () => {
   return initialState;
  }
 }
});

export default userReducer;
