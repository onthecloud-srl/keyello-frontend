import { createSelector } from "@reduxjs/toolkit";

import { type AppState } from "../store";

const getUser = (state: AppState) => state.user;

export const getUserAuthentication = createSelector(
 getUser,
 (user): boolean => !!user?.authenticated
);

export const getUserData = createSelector(getUser, (user) => {
 return user;
});
