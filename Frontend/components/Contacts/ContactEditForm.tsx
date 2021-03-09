import { FunctionComponent } from "react";
import { Field } from "formik";
import { IContact } from "../../interfaces/IContact";
import { TextField } from "formik-material-ui";
import { createStyles, makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& .MuiTextField-root": {
                marginBottom: theme.spacing(2),
            }
        }
    })
);

interface IProps {
    contact: IContact;
}
const ContactEditForm: FunctionComponent<IProps> = ({ }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Field fullWidth={true}
                component={TextField}
                id="firstName"
                name="firstName"
                label="First Name"
            />

            <Field fullWidth={true}
                component={TextField}
                id="lastName"
                name="lastName"
                label="Last Name"
            />

            <Field fullWidth={true}
                component={TextField}
                id="nickName"
                name="nickName"
                label="Nickname"
            />

            <Field fullWidth={true}
                component={TextField}
                id="email"
                name="email"
                type="email"
                label="Email"
            />

            <Field fullWidth={true}
                component={TextField}
                id="number"
                name="number"
                type="tel"
                label="Number"
            />

        </div>
    );
};

export default ContactEditForm;
