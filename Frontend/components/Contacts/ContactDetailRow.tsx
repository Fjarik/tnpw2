import { FunctionComponent } from "react";
import { Grid, Theme, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            textAlign: "center",
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        text: {
            textAlign: "left",
            marginTop: "auto",
            marginBottom: "auto",
        }
    }),
);

interface IProps {
    children?: string | JSX.Element,
    icon: JSX.Element,
}
const ContactDetailRow: FunctionComponent<IProps> = ({ children: text, icon }) => {
    const classes = useStyles();

    if (!text) {
        return <></>;
    }

    return (
        <>
            <Grid item xs={1} className={classes.icon}>
                {icon}
            </Grid>
            <Grid item xs={11} className={classes.text}>
                {text}
            </Grid>
        </>
    );
};

export default ContactDetailRow;
