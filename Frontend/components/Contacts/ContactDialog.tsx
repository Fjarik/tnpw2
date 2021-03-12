import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { FunctionComponent } from "react";
import { IContact } from "../../interfaces/IContact";
import { Formik, FormikHelpers, Form } from "formik";
import ContactEditForm from "./ContactEditForm";
// import { Client } from "../../services/generated/apiService";
import * as yup from "yup";


const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    nickName: yup.string().nullable(true).notRequired(),
    email: yup.string().nullable(true).notRequired().email("Not valid email"),
    number: yup.string().nullable(true).notRequired(),
    birthDate: yup.date().nullable(true).notRequired().min(new Date(1900, 0, 1)),
});

interface IProps {
    open: boolean;
    contact: IContact;
    onClose: () => void;
    onSave: (contact: IContact) => Promise<void>;
}

const ContactDialog: FunctionComponent<IProps> = ({ open, contact, onClose, onSave }) => {

    const handleClose = (): void => {
        onClose();
    };

    const handleSubmit = async (values: IContact, formikHelpers: FormikHelpers<IContact>): Promise<void> => {
        console.log(values);
        console.log(formikHelpers);

        const res = await validationSchema.isValid(values);

        // const client = new Client();

        console.log(res);
        onSave(values);
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth={"lg"} fullWidth={true}>
            <Formik initialValues={contact} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div>
                        <DialogTitle>Contact</DialogTitle>
                        <DialogContent>
                            <ContactEditForm contact={contact} />
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
        </Dialog>
    );
};

export default ContactDialog;
