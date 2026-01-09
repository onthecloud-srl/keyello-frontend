import notificationReducer from "../reducers/notificationReducer";
import userReducer from "../reducers/userReducer";
import type { AppAction } from "../store";

import { getMe } from "./userHandler";

import { generateUniqueId } from "@/helpers/generic";
import { ApiService } from "@/service/ApiService";

export const postLogin =
 (email: string, password: string): AppAction<Promise<boolean>> =>
 async (dispatch) => {
  try {
   //da inserire quando si applica la modifica dell'ApiService
   //const ApiData = { url: "/auth", method: "POST", params: { email, password } };
   const { data, status } = await ApiService<{ token: string }>("/auth/login", "POST", {
    email,
    password
   });
   const token = data?.token;
   if (!token || status !== 200) return false; // TODO: handle error with no token
   // Save token in local storage
   localStorage.setItem("jwt", token);
   // Call user info
   await dispatch(getMe());
   return true;
  } catch (error: any) {
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: `Failed to login - ${error?.message || "unknown error"}`,
     timestamp: Date.now(),
     type: "error"
    })
   );
   return false;
  }
 };

export const logoutAction = (): AppAction<void> => (dispatch) => {
 localStorage.removeItem("jwt");
 localStorage.removeItem("doubleAuth");
 dispatch(userReducer.actions.resetUser());
};

export const postRegistration =
 (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  password2: string
 ): AppAction<Promise<boolean>> =>
 async (dispatch) => {
  try {
   const { status } = await ApiService("/auth/register", "POST", {
    firstname,
    lastname,
    email,
    password,
    password2
   });
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: "Registrazione avvenuta con successo",
     timestamp: Date.now(),
     type: "success"
    })
   );
   if (status !== 201) return false; // TODO: handle error for status !== 200
   return true;
  } catch (error: any) {
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: `Registrazione fallita - ${error?.message || "unknown error"}`,
     timestamp: Date.now(),
     type: "error"
    })
   );
   return false;
  }
 };

export const postVerifyEmail =
 (token: string): AppAction<Promise<void>> =>
 async (dispatch) => {
  try {
   const { status } = await ApiService("/auth/verify-email", "POST", { token: token });
   if (status)
    dispatch(
     notificationReducer.actions.addAlert({
      id: generateUniqueId(),
      message: "Email verificata con successo",
      timestamp: Date.now(),
      type: "success"
     })
    );
  } catch (error: any) {
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: `Errore durante la verifica della email - ${error?.message || "unknown error"}`,
     timestamp: Date.now(),
     type: "error"
    })
   );
  }
 };

export const postSendRecoverEmail =
 (email: string): AppAction<Promise<void>> =>
 async (dispatch) => {
  try {
   const { status } = await ApiService("/auth/forgot-password", "POST", { email });
   if (status)
    dispatch(
     notificationReducer.actions.addAlert({
      id: generateUniqueId(),
      message: "Email di recupero inviata con successo",
      timestamp: Date.now(),
      type: "success"
     })
    );
  } catch (error: any) {
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: `Errore durante l'invio della email di recupero - ${error?.message || "unknown error"}`,
     timestamp: Date.now(),
     type: "error"
    })
   );
  }
 };

export const postResetPassword =
 (token: string, password: string, password2: string): AppAction<Promise<void>> =>
 async (dispatch) => {
  try {
   const { status } = await ApiService("/auth/reset-password", "POST", {
    token,
    password,
    password2
   });
   if (status)
    dispatch(
     notificationReducer.actions.addAlert({
      id: generateUniqueId(),
      message: "Password modificata con successo",
      timestamp: Date.now(),
      type: "success"
     })
    );
  } catch (error: any) {
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: `Errore durante la modifica della password - ${error?.message || "unknown error"}`,
     timestamp: Date.now(),
     type: "error"
    })
   );
  }
 };
