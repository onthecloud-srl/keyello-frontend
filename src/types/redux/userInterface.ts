export interface IUser {
 userId: string;
 firstname: string;
 lastname: string;
 email: string;
 telephone: string | null;
 createdAt: string; // ISO date
 updatedAt: string; // ISO date
 authenticated: boolean;
}
