import { FunctionComponent, useState } from "react";
import { Contact } from "@services";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useClient } from "@lib/ClientContext";

interface IProps {
    contact: Contact;
    reload: () => void;
}
const FavouriteButton: FunctionComponent<IProps> = ({ contact, reload }) => {
    const client = useClient();

    const [loading, setLoading] = useState<boolean>(false);

    const { id, favourite } = contact;

    const onFavouriteClick = async (): Promise<void> => {
        setLoading(true);
        const res = await client.apiContactsSetfavouritePost({ id, favourite: !favourite });
        if (res.content) {
            reload();
        }
        setLoading(false);
    };

    return (
        <IconButton onClick={onFavouriteClick} disabled={loading}>
            {favourite ?
                <FavoriteIcon />
                :
                <FavoriteBorderIcon />
            }
        </IconButton>
    );
};

export default FavouriteButton;
