import { createContext, useContext } from "react";
import { Contact, ContactsApi, ContactsApiInterface } from "@services";

export interface ITableContext {
    client: ContactsApiInterface;
    reloadTable: () => void;
    onClose: () => void;
    switchToEdit: () => void;
    onSave: (contact: Contact) => Promise<void>;
}

export const TableContext = createContext<ITableContext>(
    {
        client: new ContactsApi({}, ""),
        reloadTable: () => { /**/ },
        onClose: () => { /**/ },
        switchToEdit: () => { /**/ },
        onSave: async () => {/**/ },
    }
);

export const useTable = (): ITableContext => {
    const ctx = useContext<ITableContext>(TableContext);

    return ctx;
};

