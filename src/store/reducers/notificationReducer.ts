import { type PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { type Alert, type Command, type INotification } from "@/types/redux/notificationInterfaces";

const initialState: INotification = {
 commands: [],
 alerts: []
};

const notificationReducer = createSlice({
 name: "notification",
 initialState,
 reducers: {
  addCommand: (state, { payload }: PayloadAction<Command>) => {
   state.commands.push(payload);
  },
  removeCommand: (state, { payload }: PayloadAction<{ id: string }>) => {
   state.commands = state.commands.filter((command) => command.id !== payload.id);
  },
  addAlert: (state, { payload }: PayloadAction<Alert>) => {
   state.alerts.push(payload);
  },
  removeFirstAlert: (state) => {
   state.alerts.shift();
  },
  removeAllAlerts: (state) => {
   state.alerts = [];
  }
 }
});

export default notificationReducer;
