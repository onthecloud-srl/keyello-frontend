export interface IErrorAPI {
 dataset: Array<IErrorData>;
 totalCount: number;
}

export interface IErrorData {
 code: string;
 createdAt: string;
 id: number;
 message: string;
 status: number;
 updatedAt: string;
 url: string;
 userid: string | null;
 personalName: string | null;
}
