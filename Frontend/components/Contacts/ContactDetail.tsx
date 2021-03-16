import { FunctionComponent } from "react";
import { Contact } from "../../services/generated";
import { Button, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";

interface IProps {
    contact: Contact;
    onClose: () => void;
    switchToEdit: () => void;
}
const ContactDetail: FunctionComponent<IProps> = ({ onClose, switchToEdit }) => {
    return (
        <div>
            <DialogTitle>Contact</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={switchToEdit} color="primary">
                    edit
                </Button>
            </DialogActions>
        </div>
    );
};

export default ContactDetail;
