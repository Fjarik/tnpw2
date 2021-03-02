
import { MouseEvent, FunctionComponent, useState } from "react";
import { AppBar, Toolbar, IconButton, makeStyles, createStyles, Theme, Typography, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import ThemeChangeButton from "../Themes/ThemeChangeButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        marginRight: theme.spacing(2),
        flexGrow: 1,
    },
}),
);
const MainAppBar: FunctionComponent = () => {
    const classes = useStyles();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openUserMenu = (event: MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const closeUserMenu = (): void => {
        setAnchorEl(null);
    };

    const gotoMainPage = (): void => {
        router.push("/");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <div className={classes.title}>
                    <Button onClick={gotoMainPage} color="inherit" >
                        <Typography variant="h6">
                            Contacts
                        </Typography>
                    </Button>
                </div>
                <div>
                    <ThemeChangeButton />
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={openUserMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <UserMenu anchorEl={anchorEl} onClose={closeUserMenu} />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default MainAppBar;
