import { FunctionComponent } from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { DatePicker } from "formik-material-ui-pickers";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& .MuiTextField-root": {
                marginBottom: theme.spacing(2),
            }
        }
    })
);

const ContactEditForm: FunctionComponent = ({ }) => {
    const classes = useStyles();

    const customDate = (props: never): JSX.Element => (
        <DatePicker format="yyyy-MM-dd" autoOk={true} minDate={new Date(1900, 1, 1)} clearable={true} disableFuture={true} {...props} />
    );

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

            <Field fullWidth={true}
                component={customDate}
                id="birthDate"
                name="birthDate"
                label="Birthdate"
            />

        </div>
    );
};

export default ContactEditForm;
