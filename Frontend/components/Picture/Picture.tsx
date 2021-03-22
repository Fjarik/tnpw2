import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { FunctionComponent } from "react";
import { Contact } from "@services";

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        }
    })
);

interface IProps {
    contact: Contact;
}
const Picture: FunctionComponent<IProps> = ({ contact }) => {
    const classes = useStyle();

    const { image, firstName, lastName } = contact;
    if (!image) {
        return (
            <Avatar className={classes.orange}>{firstName.charAt(0)?.toUpperCase() || lastName?.charAt(0)?.toUpperCase() || ""}</Avatar>
        );
    }

    const { base64, format } = image;
    const src = "data:" + format + ";base64, " + base64;

    return (
        <Avatar src={src} />
    );
};

export default Picture;
