import { FunctionComponent } from "react";
import { useSession } from "next-auth/client";
import { IUserModel } from "../../services/authService";
import { Container, Grid, Typography, Paper, makeStyles, createStyles } from "@material-ui/core";

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

    const user = session.user as IUserModel;

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
                            {user.FirstName} {user.LastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Username
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            {user.UserName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            Email
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                            {user.Email}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    </>;
};

export default Profile;