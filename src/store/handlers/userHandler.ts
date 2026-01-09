import notificationReducer from "../reducers/notificationReducer";
import userReducer from "../reducers/userReducer";
import type { AppAction } from "../store";

import { generateUniqueId } from "@/helpers/generic";
import { ApiService } from "@/service/ApiService";
import type { IUserAPI } from "@/types/api/userApiInterface";

export const getMe = (): AppAction<Promise<void>> => async (dispatch) => {
 try {
  const { data, status } = await ApiService<IUserAPI>("/users/me", "GET");
  status === 200 && dispatch(userReducer.actions.setUser(data));
 } catch (error: any) {
  localStorage.removeItem("jwt");
  dispatch(
   notificationReducer.actions.addAlert({
    id: generateUniqueId(),
    message: `Failed to load data - ${error?.message || "unknown error"}`,
    timestamp: Date.now(),
    type: "error"
   })
  );
 }
};

export const patchUserData =
 (data: Record<string, string | null>): AppAction<Promise<void>> =>
 async (dispatch) => {
  try {
   const { status } = await ApiService("/users/me", "PATCH", data);
   if (status)
    dispatch(
     notificationReducer.actions.addAlert({
      id: generateUniqueId(),
      message: "Dati utente modificati con successo",
      timestamp: Date.now(),
      type: "success"
     })
    );
  } catch (error: any) {
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: `Errore durante la modifica dei dati utente - ${error?.message || "unknown error"}`,
     timestamp: Date.now(),
     type: "error"
    })
   );
  }
 };
