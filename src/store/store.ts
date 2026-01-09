import {
 type Action,
 combineReducers,
 configureStore,
 createListenerMiddleware,
 type ThunkAction
} from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
 [notificationReducer.name]: notificationReducer.reducer,
 [userReducer.name]: userReducer.reducer
});

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
 actionCreator: notificationReducer.actions.addAlert,
 effect: async (action, _listenerApi) => {
  console.log("todoAdded effect : TODO: Add error manager here !", action);
 }
});

export const store = (initialState: AppState) =>
 configureStore({
  reducer: (state, action: Action) => rootReducer(state, action),
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: true
 });

export type RootStore = ReturnType<typeof store>;
export type AppDispatch = RootStore["dispatch"];
export type RootState = ReturnType<RootStore["getState"]>;
export type AppAction<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, Action>;
export type AppState = Partial<ReturnType<typeof rootReducer>>;
