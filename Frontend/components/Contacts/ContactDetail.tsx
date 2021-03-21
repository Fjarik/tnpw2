import { FunctionComponent } from "react";
import { Contact } from "@services";
import { Button, DialogActions, DialogContent, DialogTitle, Grid, Theme, Typography, makeStyles, createStyles } from "@material-ui/core";
import Picture from "./Picture";
import PhoneIcon from "@material-ui/icons/Phone";
import CakeIcon from "@material-ui/icons/Cake";
import ContactDetailRow from "./ContactDetailRow";
import EmailIcon from "@material-ui/icons/Email";
import EventIcon from "@material-ui/icons/Event";
import NameDay from "./NameDay";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            paddingRight: theme.spacing(1),
        },
        text: {
            textAlign: "left",
            marginTop: "auto",
            marginBottom: "auto",
        }
    }),
);

interface IProps {
    contact: Contact;
    onClose: () => void;
    switchToEdit: () => void;
}
const ContactDetail: FunctionComponent<IProps> = ({ contact, onClose, switchToEdit }) => {
    const classes = useStyles();

    const { firstName, lastName, number, nickName, birthDate } = contact;

    const fullName = firstName + (lastName ? (" " + lastName) : "") + (nickName ? ("," + nickName) : "");

    return (
        <div>
            <DialogTitle>
                <Grid container>
                    <Grid item xs="auto" className={classes.avatar}>
                        <Picture contact={contact} />
                    </Grid>
                    <Grid item className={classes.text}>
                        <Typography variant="h5">
                            {fullName}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>Information</Typography>
                    </Grid>
                    <ContactDetailRow icon={<EmailIcon />} />
                    <ContactDetailRow icon={<PhoneIcon />} >
                        {number}
                    </ContactDetailRow>
                    <ContactDetailRow icon={<CakeIcon />} >
                        {birthDate?.toDateString()}
                    </ContactDetailRow>
                    <ContactDetailRow icon={<EventIcon />} >
                        <NameDay firstName={firstName} />
                    </ContactDetailRow>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={switchToEdit} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </div>
    );
};

export default ContactDetail;
