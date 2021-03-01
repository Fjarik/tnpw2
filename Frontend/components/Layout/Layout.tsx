import { MouseEvent, FunctionComponent, ReactNode, useState } from "react";
import Head from "next/head";
import { AppBar, Toolbar, IconButton, makeStyles, createStyles, Theme, Typography, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useSession } from "next-auth/client";
import ThemeChangeButton from "../Themes/ThemeChangeButton";
import UserMenu from "./UserMenu";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  }
}),
);

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: FunctionComponent<Props> = ({ children, title }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const [session, loading] = useSession();
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

  if (loading || !session) {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>Contacts | {title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

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
      {children}
      <footer>
        <hr />
      </footer>
    </div>
  );
};

export default Layout;
