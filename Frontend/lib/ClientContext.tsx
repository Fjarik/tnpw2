import { createContext, useContext } from "react";
import { ContactsApi, ContactsApiInterface } from "@services";

export interface IClientContext {
    client: ContactsApiInterface;
}

export const ClientContext = createContext<IClientContext>(
    {
        client: new ContactsApi({}, "")
    }
);

export const useClient = (): ContactsApiInterface => {
    const ctx = useContext<IClientContext>(ClientContext);

    return ctx.client;
};

