import { FunctionComponent } from "react";
import { Contact } from "@services";
import { Button, DialogActions, DialogContent, DialogTitle, Grid, Theme, Typography, makeStyles, createStyles, Link, Tooltip } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import CakeIcon from "@material-ui/icons/Cake";
import ContactDetailRow from "./ContactDetailRow";
import EmailIcon from "@material-ui/icons/Email";
import EventIcon from "@material-ui/icons/Event";
import NameDay from "@components/Date/NameDay";
import PictureForm from "@components/Picture/PictureForm";
import daysUntil from "@utils/DaysUntil";
import format from "date-fns/format";

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
    reload: () => void;
    switchToEdit: () => void;
}
const ContactDetail: FunctionComponent<IProps> = ({ contact, onClose, switchToEdit, reload }) => {
    const classes = useStyles();

    const { firstName, lastName, number, nickName, birthDate, email } = contact;

    const fullName = firstName + (lastName ? (" " + lastName) : "") + (nickName ? (", " + nickName) : "");

    const date = birthDate && (format(new Date(birthDate), "dd.MM.yyyy") + " - " + daysUntil(birthDate));

    return (
        <div>
            <DialogTitle>
                <Grid container>
                    <Grid item xs="auto" className={classes.avatar}>
                        <PictureForm contact={contact} reload={reload} />
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
                    {number && <ContactDetailRow icon={<Tooltip title="Number"><PhoneIcon /></Tooltip>} >
                        <Typography>
                            <Link href={"tel:" + number} color="textPrimary">{number}</Link>
                        </Typography>
                    </ContactDetailRow>}
                    {email && <ContactDetailRow icon={<Tooltip title="Email"><EmailIcon /></Tooltip>} >
                        <Typography>
                            <Link href={"mailto:" + email} color="textPrimary">{email}</Link>
                        </Typography>
                    </ContactDetailRow>}
                    {date && <ContactDetailRow icon={<Tooltip title="Birthdate"><CakeIcon /></Tooltip>} >
                        <Typography>
                            {date}
                        </Typography>
                    </ContactDetailRow>}
                    <ContactDetailRow icon={<Tooltip title="Nameday"><EventIcon /></Tooltip>} >
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
        </div >
    );
};

export default ContactDetail;
