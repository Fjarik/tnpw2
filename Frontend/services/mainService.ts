import { Session } from "next-auth/client";
import { ContactsApi, ContactsApiInterface } from "./generated";

export const getClientFromSession = (session?: Session): ContactsApiInterface => {
    return getClient(session?.accessToken);
};

export const getClient = (token?: string): ContactsApiInterface => {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    return new ContactsApi({
        apiKey: "Bearer " + token,
    }, apiUrl);
};