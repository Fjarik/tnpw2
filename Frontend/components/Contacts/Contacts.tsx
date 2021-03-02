import { FunctionComponent } from "react";
import { IContact } from "../../interfaces/IContact";
import MaterialTable, { Action, Column, MaterialTableProps, Options } from "material-table";

interface IProps {
    contacts: IContact[];
}
const Contacts: FunctionComponent<IProps> = ({ contacts }) => {

    const onRowSelected = (contact: IContact): void => {
        console.log(contact);
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
            onClick: (event, contact): void => {
                console.log(event);
                console.log(contact);
            }
        },
    ];

    const options: Options<IContact> = {
        paging: false,
        actionsColumnIndex: 99
    };

    const tableProps: MaterialTableProps<IContact> = {
        title: "Contacts",
        columns,
        data: contacts,
        actions,
        onRowSelected,
        options,
    };

    return (
        <div>
            <MaterialTable {...tableProps} />
        </div>
    );
};

export default Contacts;
