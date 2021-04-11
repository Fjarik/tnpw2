import { Container, Avatar, makeStyles, Typography, Button, Link, createStyles } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import * as yup from "yup";
import { Form, Formik } from "formik";
import RegisterForm from "@components/Forms/RegisterForm";
import { AuthApi, UserRegisterModel } from "@services";
import { signIn } from "next-auth/client";
import { FunctionComponent } from "react";

const validationSchema = yup.object({
    email: yup.string().required("Email is required").email("Not valid email"),
    userName: yup.string().required("Username is required"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    password: yup.string().required("Password is required"),
});

const useStyles = makeStyles((theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
);

const Register: FunctionComponent = () => {
    const classes = useStyles();

    const model: UserRegisterModel = {
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
    };

    const apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const client = new AuthApi({}, apiUrl);

    const handleSubmit = async (values: UserRegisterModel): Promise<void> => {
        console.log(values);

        const validationRes = await validationSchema.isValid(values);
        if (!validationRes) {
            return;
        }
        const res = await client.apiAuthRegisterPost(values);
        if (!res) {
            console.error("Registration failed");
            return;
        }
        await signIn("credentials", { username: values.userName, password: values.password });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Formik initialValues={model} validationSchema={validationSchema} onSubmit={handleSubmit} className={classes.form}>
                    <Form>
                        <RegisterForm />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                            </Button>
                        <Link href="/auth/signin" variant="body2">
                            {"Already have an account? Sign In"}
                        </Link>
                    </Form>
                </Formik>
            </div>
        </Container>
    );
};

export default Register;
