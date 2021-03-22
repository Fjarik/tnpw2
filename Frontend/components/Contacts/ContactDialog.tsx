import { Dialog } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Contact } from "@services";
import ContactDetail from "./ContactDetail";
import ContactForm from "@components/Forms/ContactForm";
import { useTable } from "@lib/TableContext";


interface IProps {
    isEdit: boolean;
    open: boolean;
    contact: Contact;
}

const ContactDialog: FunctionComponent<IProps> = ({ isEdit, open, contact }) => {
    const { onClose } = useTable();

    return (
        <Dialog onClose={onClose} open={open} maxWidth={"md"} fullWidth={true}>
            {isEdit ?
                <ContactForm contact={contact} />
                :
                <ContactDetail contact={contact} />
            }
        </Dialog>
    );
};

export default ContactDialog;
