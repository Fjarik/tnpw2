import { FunctionComponent, useState } from "react";
import { Contact } from "@services";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useTable } from "@lib/TableContext";

interface IProps {
    contact: Contact;
}
const FavouriteButton: FunctionComponent<IProps> = ({ contact }) => {
    const { client, reloadTable } = useTable();

    const [loading, setLoading] = useState<boolean>(false);

    const { id, favourite } = contact;

    const onFavouriteClick = async (): Promise<void> => {
        setLoading(true);
        const res = await client.setContactAsFavourite({ id, favourite: !favourite });
        if (res.content) {
            reloadTable();
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
