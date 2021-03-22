import { FunctionComponent, useState } from "react";
import { Contact, ContactsApiInterface } from "@services";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

interface IProps {
    contact: Contact;
    client: ContactsApiInterface;
}
const FavouriteButton: FunctionComponent<IProps> = ({ contact, client }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [favourite, setFavourite] = useState<boolean>(contact.favourite);

    const { id } = contact;

    const onFavouriteClick = async (): Promise<void> => {
        setLoading(true);
        const res = await client.apiContactsSetfavouritePost({ id, favourite: !favourite });
        if (res.content) {
            setFavourite(!favourite);
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
