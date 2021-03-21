import { FunctionComponent, MouseEvent, useRef, useState } from "react";
import MaterialTable, { Action, Column, MaterialTableProps, Options, Query, QueryResult } from "material-table";
import ContactDialog, { ContactDialogProps } from "./ContactDialog";
import { useSession } from "next-auth/client";
import { Contact, getClient } from "@services";
import Picture from "./Picture";
import { NIL } from "uuid";


const Contacts: FunctionComponent = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRef = useRef<any>();
    const [session] = useSession();
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
        tableRef?.current?.onQueryChange && tableRef.current.onQueryChange();
    };

    const handleSave = async (contact: Contact): Promise<void> => {
        setSelectedContact(contact);
        setIsEdit(false);
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
            setIsEdit(false);
        }
    };

    const columns: Column<Contact>[] = [
        {
            field: "image",
            title: "",
            // eslint-disable-next-line react/display-name
            render: (data) => (<Picture contact={data} />),
            cellStyle: {
                "width": "4%",
            },
        },
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
                    setIsEdit(true);
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
                    setIsEdit(false);
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
                    id: NIL,
                    birthDate: undefined,
                } as Contact);
                setIsEdit(true);
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

    const dialogProps: ContactDialogProps | null = selectedContact && {
        open: showDialog,
        onClose: handleDialogClose,
        onSave: handleSave,
        contact: selectedContact,
        client: client,
        switchToEdit: () => setIsEdit(true),
        isEdit,
    };

    return (
        <div>
            <MaterialTable tableRef={tableRef} {...tableProps} />
            {dialogProps &&
                <ContactDialog {...dialogProps} />
            }
        </div>
    );
};

export default Contacts;
