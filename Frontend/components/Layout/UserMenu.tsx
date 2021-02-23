import { FunctionComponent } from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@material-ui/core";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

interface IProps {
    anchorEl: HTMLElement | null,
    onClose: () => void;
}

const UserMenu: FunctionComponent<IProps> = ({ anchorEl, onClose }) => {
    const isOpen = Boolean(anchorEl);

    const router = useRouter();

    const logOff = async (): Promise<void> => {
        await signOut();
    };

    const goToProfile = (): void => {
        router.push("/user");
    };

    return (<Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        open={isOpen}
        onClose={onClose}
    >
        <MenuItem onClick={goToProfile}>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <Typography variant="inherit">My account</Typography>
        </MenuItem>
        <MenuItem onClick={logOff}>
            <ListItemIcon>
                <PowerSettingsNewIcon />
            </ListItemIcon>
            <Typography variant="inherit">Sign Out</Typography>
        </MenuItem>
    </Menu>);
};

export default UserMenu;