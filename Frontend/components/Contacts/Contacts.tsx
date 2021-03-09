import { FunctionComponent, MouseEvent, useState } from "react";
import { IContact } from "../../interfaces/IContact";
import MaterialTable, { Action, Column, MaterialTableProps, Options } from "material-table";
import ContactDialog from "./ContactDialog";

interface IProps {
    contacts: IContact[];
}
const Contacts: FunctionComponent<IProps> = ({ contacts }) => {

    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

    const showDialog = !!selectedContact;

    const handleSave = async (contact: IContact): Promise<void> => {
        console.log(contact);
        setSelectedContact(null);
    };

    const handleDialogClose = (): void => {
        setSelectedContact(null);
    };

    const handleDelete = async (contact: IContact): Promise<void> => {
        console.log("Deleted: ", contact);

    };

    const onRowClick = (_event?: MouseEvent, contact?: IContact): void => {
        if (contact) {
            setSelectedContact(contact);
        }
    };

    const columns: Column<IContact>[] = [
        { field: "firstName", title: "Firstname", },
        { field: "lastName", title: "Lastname", },
        { field: "email", title: "Email", },
        { field: "number", title: "Number", },
    ];

    const actions: Action<IContact>[] = [
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
    ];

    const options: Options<IContact> = {
        paging: false,
        actionsColumnIndex: 99,
        selection: false,
    };

    const tableProps: MaterialTableProps<IContact> = {
        title: "Contacts",
        columns,
        data: contacts,
        actions,
        onRowClick,
        options,
    };

    return (
        <div>
            <MaterialTable {...tableProps} />
            {selectedContact &&
                <ContactDialog open={showDialog} onClose={handleDialogClose} onSave={handleSave} contact={selectedContact} />
            }
        </div>
    );
};

export default Contacts;
