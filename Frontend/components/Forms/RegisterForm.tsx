import { FunctionComponent } from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

const ContactEditForm: FunctionComponent = () => {
    return (
        <>
            <Field
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                component={TextField}
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
            />

            <Field
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                component={TextField}
                id="userName"
                name="userName"
                label="Username"
                autoComplete="username"
            />

            <Field
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                component={TextField}
                id="firstName"
                name="firstName"
                label="First Name"
                autoComplete="given-name"
            />

            <Field
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                component={TextField}
                id="lastName"
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
            />

            <Field
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth={true}
                component={TextField}
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
            />

        </>
    );
};

export default ContactEditForm;
