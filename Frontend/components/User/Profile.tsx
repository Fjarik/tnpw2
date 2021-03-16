import { FunctionComponent } from "react";
import { useSession } from "next-auth/client";
import { Container, Grid, Typography, Paper, makeStyles, createStyles } from "@material-ui/core";
import { UserModel } from "../../services/generated";

const useStyles = makeStyles(() => createStyles({
    main: {
        marginTop: "10rem",
        marginBottom: "10rem",
        padding: "1rem",
    }
}));

const Profile: FunctionComponent = () => {
    const [session, loading] = useSession();
    const classes = useStyles();

    if (loading || !session) {
        return <></>;
    }

    const user = session.user as UserModel;

    return <>
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.main}>
                <Typography variant="h4">
                    Profile
                </Typography>
                <hr />
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Name
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            {user.firstName} {user.lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Username
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            {user.userName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Email
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            {user.email}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    </>;
};

export default Profile;