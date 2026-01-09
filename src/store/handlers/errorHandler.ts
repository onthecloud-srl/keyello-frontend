import { generateUniqueId } from "@/helpers/generic";
import { ApiService } from "@/service/ApiService";
import notificationReducer from "@/store/reducers/notificationReducer";
import { type AppAction } from "@/store/store";
import type { IErrorAPI } from "@/types/api/errorsApiInterface";

export const postSaveError = async (code: string, status: string, url: string, message: string) => {
 try {
  await ApiService("/error/save-error", "POST", { code, status, url, message });
 } catch (error: any) {
  console.log(`App Error: ${error.message}`);
 }
};

export const getAllErrors =
 (currentIndex: number, sizePerPage: number, q?: string): AppAction<Promise<IErrorAPI | null>> =>
 async (dispatch) => {
  try {
   const { data } = await ApiService<IErrorAPI>(
    `/error/get-errors?page=${currentIndex}&limit=${sizePerPage}&q=${q || ""}`
   );
   return data;
  } catch (error: any) {
   dispatch(
    notificationReducer.actions.addAlert({
     id: generateUniqueId(),
     message: `Failed to load errors - ${error?.message || "unknown error"}`,
     timestamp: Date.now(),
     type: "error"
    })
   );
   return null;
  }
 };
