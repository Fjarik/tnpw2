import { Dialog } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Contact } from "@services";
import ContactDetail from "./ContactDetail";
import ContactForm from "@components/Forms/ContactForm";


export interface ContactDialogProps {
    isEdit: boolean;
    open: boolean;
    contact: Contact;
    onClose: () => void;
    onSave: (contact: Contact) => Promise<void>;
    switchToEdit: () => void;
    reload: () => void;
}

const ContactDialog: FunctionComponent<ContactDialogProps> = ({ isEdit, open, contact, onClose, onSave, switchToEdit, reload }) => {


    return (
        <Dialog onClose={onClose} open={open} maxWidth={"md"} fullWidth={true}>
            {isEdit ?
                <ContactForm contact={contact} onClose={onClose} onSave={onSave} />
                :
                <ContactDetail contact={contact} onClose={onClose} switchToEdit={switchToEdit} reload={reload} />
            }
        </Dialog>
    );
};

export default ContactDialog;
