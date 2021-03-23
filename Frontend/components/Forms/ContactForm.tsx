import { FunctionComponent } from "react";
import { Contact } from "@services";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Button, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import ContactEditForm from "./ContactEditForm";
import { useTable } from "@lib/TableContext";
import { format } from "date-fns";

const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().nullable(true).notRequired(),
    nickName: yup.string().nullable(true).notRequired(),
    email: yup.string().nullable(true).notRequired().email("Not valid email"),
    number: yup.string().nullable(true).notRequired(),
    birthDate: yup.date().nullable(true).notRequired().min(new Date(1900, 0, 1)),
});

interface IProps {
    contact: Contact;
}
const ContactForm: FunctionComponent<IProps> = ({ contact }) => {
    const { client, onClose, onSave } = useTable();

    const initialContact: Contact = {
        ...contact,
        lastName: contact.lastName ?? "",
        nickName: contact.nickName ?? "",
        email: contact.email ?? "",
        number: contact.number ?? "",
        birthDate: contact.birthDate ?? null,
    };

    const handleSubmit = async (values: Contact): Promise<void> => {
        const validationRes = await validationSchema.isValid(values);
        if (!validationRes) {
            return;
        }
        const { birthDate } = values;
        const date = birthDate ? format(new Date(birthDate), "yyyy-MM-dd") : null;

        const res = await client.createOrUpdate({
            ...values,
            birthDate: date
        });
        if (res.errors && res.errors.length > 0) {
            console.error(res.errors);
        }
        if (res.content) {
            await onSave(res.content);
        }
    };

    return (
        <Formik initialValues={initialContact} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
                <div>
                    <DialogTitle>Contact</DialogTitle>
                    <DialogContent>
                        <ContactEditForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
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
};

export default ContactForm;
