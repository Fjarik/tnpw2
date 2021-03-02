import { FunctionComponent, ReactNode } from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core";
import { useSession } from "next-auth/client";
import Footer from "./Footer";
import MainAppBar from "./MainAppBar";

const useStyles = makeStyles(() => createStyles({
  main: {
    minHeight: "calc(100vh - 58px - 64px)"
  },
}),
);

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: FunctionComponent<Props> = ({ children, title }: Props) => {
  const classes = useStyles();
  const [session, loading] = useSession();

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

      <MainAppBar />
      <main className={classes.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
