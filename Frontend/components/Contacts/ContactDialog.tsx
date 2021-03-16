import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Formik, Form } from "formik";
import ContactEditForm from "./ContactEditForm";
import * as yup from "yup";
import { Contact } from "../../services/generated";
import { ContactModel, ContactsApiInterface } from "../../services/generated";
import ContactDetail from "./ContactDetail";


const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    nickName: yup.string().nullable(true).notRequired(),
    email: yup.string().nullable(true).notRequired().email("Not valid email"),
    number: yup.string().nullable(true).notRequired(),
    birthDate: yup.date().nullable(true).notRequired().min(new Date(1900, 0, 1)),
});

export interface ContactDialogProps {
    isEdit: boolean;
    open: boolean;
    contact: Contact;
    onClose: () => void;
    onSave: (contact: Contact) => Promise<void>;
    switchToEdit: () => void;
    client: ContactsApiInterface;
}

const ContactDialog: FunctionComponent<ContactDialogProps> = ({ isEdit, open, contact, onClose, onSave, switchToEdit, client }) => {

    contact.nickName = contact.nickName ?? "";
    contact.number = contact.number ?? "";

    const handleClose = (): void => {
        onClose();
    };

    const handleSubmit = async (values: Contact): Promise<void> => {
        const validationRes = await validationSchema.isValid(values);
        if (!validationRes) {
            return;
        }
        const c = values as ContactModel;

        const res = await client.apiContactsCreateorupdatePost(c);
        if (res.errors && res.errors.length > 0) {
            console.error(res.errors);
        }
        if (res.content) {
            await onSave(res.content);
        }
    };

    const form = (
        <Formik initialValues={contact} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <div>
                    <DialogTitle>Contact</DialogTitle>
                    <DialogContent>
                        <ContactEditForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </div>
            </Form>
        </Formik>
    );

    const detail = (
        <ContactDetail contact={contact} onClose={onClose} switchToEdit={switchToEdit} />
    );

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={"lg"} fullWidth={true}>
            {isEdit ? form : detail}
        </Dialog>
    );
};

export default ContactDialog;
