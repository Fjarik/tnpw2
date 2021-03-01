export interface IContact {
    id: string;
    firstName: string;
    lastName: string;
    nickName?: string | null;
    email?: string | null;
    number?: string | null;
    birthDate?: string | null;
}