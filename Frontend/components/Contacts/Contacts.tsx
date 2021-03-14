import { FunctionComponent, MouseEvent, useRef, useState } from "react";
import MaterialTable, { Action, Column, MaterialTableProps, Options, Query, QueryResult } from "material-table";
import ContactDialog from "./ContactDialog";
import { getClient } from "../../services/mainService";
import { useSession } from "next-auth/client";
import { Contact } from "../../services/generated";


const Contacts: FunctionComponent = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRef = useRef<any>();
    const [session] = useSession();
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    if (!session || !session.accessToken) {
        return <></>;
    }

    const showDialog = !!selectedContact;

    const client = getClient(session.accessToken);

    const getContactsAsync = async (query: Query<Contact>): Promise<QueryResult<Contact>> => {
        const res = await client.apiContactsGetallGet();
        if (res.errors && res.errors.length > 0) {
            console.error(res.errors);
        }
        if (!res.content) {
            return {
                data: [],
                page: query.page,
                totalCount: query.totalCount,
            };
        }
        return {
            data: res.content,
            page: query.page,
            totalCount: res.content.length
        };
    };

    const reloadTable = (): void => {
        tableRef.current && tableRef.current.onQueryChange();
    };

    const handleSave = async (): Promise<void> => {
        setSelectedContact(null);

        reloadTable();
    };

    const handleDialogClose = (): void => {
        setSelectedContact(null);
    };

    const handleDelete = async (contact: Contact): Promise<void> => {
        console.log("Deleted: ", contact);
        const res = await client.apiContactsDeleteDelete(contact.id);

        if (res.errors && res.errors.length > 0) {
            console.error(res.errors);
        }
        if (res.content) {
            reloadTable();
        }
    };

    const onRowClick = (_event?: MouseEvent, contact?: Contact): void => {
        if (contact) {
            setSelectedContact(contact);
        }
    };

    const columns: Column<Contact>[] = [
        { field: "firstName", title: "Firstname", },
        { field: "lastName", title: "Lastname", },
        { field: "email", title: "Email", },
        { field: "number", title: "Number", },
    ];

    const actions: Action<Contact>[] = [
        {
            icon: "edit",
            tooltip: "Edit",
            onClick: (_event, contacts): void => {
                const contact = Array.isArray(contacts) ? contacts[0] : contacts;
                if (contact) {
                    setSelectedContact(contact);
                }
            },
        },
        {
            icon: "delete",
            tooltip: "Delete",
            onClick: async (_event, contacts): Promise<void> => {
                const contact = Array.isArray(contacts) ? contacts[0] : contacts;
                if (contact) {
                    await handleDelete(contact);
                }
            },
        },
        {
            icon: "add",
            tooltip: "Create contact",
            isFreeAction: true,
            onClick: (): void => {
                setSelectedContact({
                    firstName: "",
                    lastName: "",
                    id: "00000000-0000-0000-0000-000000000000",
                    birthDate: undefined,
                } as Contact);
            },
        }
    ];

    const options: Options<Contact> = {
        paging: false,
        actionsColumnIndex: 99,
        selection: false,
    };

    const tableProps: MaterialTableProps<Contact> = {
        title: "Contacts",
        columns,
        data: getContactsAsync,
        actions,
        onRowClick,
        options,
    };

    return (
        <div>
            <MaterialTable tableRef={tableRef} {...tableProps} />
            {selectedContact &&
                <ContactDialog open={showDialog} onClose={handleDialogClose} onSave={handleSave} contact={selectedContact} client={client} />
            }
        </div>
    );
};

export default Contacts;
