import { ContactsApi, ContactsApiInterface } from "./generated";

export const getClient = (apiUrl: string, token: string): ContactsApiInterface => {
    return new ContactsApi({
        apiKey: token,
    }, apiUrl);
};