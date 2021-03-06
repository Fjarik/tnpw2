import { ChangeEventHandler, FunctionComponent, useRef, useState } from "react";
import { Contact } from "@services";
import Picture from "@components/Picture/Picture";
import { CircularProgress, IconButton, Theme, makeStyles, createStyles } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { useTable } from "@lib/TableContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarBtn: {
            padding: theme.spacing(0),
        },
        deleteBtn: {
            padding: theme.spacing(0),
            verticalAlign: "top",
            marginTop: "-8px",
            marginLeft: "-4px",
        }
    }),
);
interface IProps {
    contact: Contact;
}
const PictureForm: FunctionComponent<IProps> = ({ contact }) => {
    const inputFile = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const classes = useStyles();

    const { client, reloadTable } = useTable();

    const { id, image } = contact;

    const onPictureClick = (): void => {
        inputFile?.current?.click();
    };

    const onFileSelect: ChangeEventHandler<HTMLInputElement> = async (event): Promise<void> => {
        const file = event?.target?.files?.item(0);
        if (file) {
            setLoading(true);
            const res = await client.setContactPhoto(file, id);
            if (res) {
                reloadTable();
            }
            setLoading(false);
        }
    };

    const deletePicture = async (): Promise<void> => {
        setLoading(true);
        const res = await client.deletePhoto(id);
        if (res) {
            reloadTable();
        }
        setLoading(false);
    };

    if (loading) {
        return (<CircularProgress />);
    }

    return (
        <>
            <input type="file" id="picture" name="picture" ref={inputFile} onChange={onFileSelect} accept="image/jpeg, image/png" multiple={false} style={{ display: "none" }} />
            <IconButton onClick={onPictureClick} className={classes.avatarBtn}>
                <Picture contact={contact} />
            </IconButton>
            {image &&
                <IconButton size="small" onClick={deletePicture} className={classes.deleteBtn} color="secondary" title="Remove picture">
                    <ClearIcon fontSize="small" />
                </IconButton>
            }
        </>
    );
};

export default PictureForm;
