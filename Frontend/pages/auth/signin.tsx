import { Container, Avatar, makeStyles, Typography, TextField, Button, Link } from "@material-ui/core";
import { GetServerSideProps, NextPage } from "next";
import { getCsrfToken, useSession } from "next-auth/client";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
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
}));

interface IProps {
    token?: string
}
const SignIn: NextPage<IProps> = ({ token }) => {
    const classes = useStyles();
    const router = useRouter();
    const [session, loading] = useSession();

    if (loading) {
        return <></>;
    }
    if (session) {
        router.push("/");
        return <></>;
    }


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
            </Typography>
                <form method='post' action='/api/auth/callback/credentials' className={classes.form}>
                    <input name='csrfToken' type='hidden' defaultValue={token} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus={true} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                </Button>
                    <Link href="/auth/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </form>
            </div>
        </Container>
    );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            token: await getCsrfToken(context),
        }
    };
};

export default SignIn;