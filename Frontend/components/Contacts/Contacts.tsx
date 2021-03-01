import { FunctionComponent } from "react";
import { IContact } from "../../interfaces/IContact";
import MaterialTable, { Column } from "material-table";

interface IProps {
    contacts: IContact[];
}
const Contacts: FunctionComponent<IProps> = ({ contacts }) => {

    const columns: Column<IContact>[] = [
        { field: "firstName", title: "Firstname", },
        { field: "lastName", title: "Lastname", },
        { field: "email", title: "Email", },
        { field: "number", title: "Number", },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <MaterialTable title="Contacts" columns={columns} data={contacts}  />
        </div>
    );
};

export default Contacts;
