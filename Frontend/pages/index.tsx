import { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/client";
import { withAuthServerSideProps } from "../components/auth/AuthWrapper";
import Layout from "../components/Layout/Layout";
import { Button } from "@material-ui/core";

const IndexPage: NextPage = ({ }) => {
    const [session, loading] = useSession();

    if (loading || !session) {
        return <></>;
    }

    return (
        <Layout title="Home">
            <h1>Hello Next.js 👋</h1>
            <p>

            </p>
            <p>Signed in as {JSON.stringify(session.user)}</p>

            <Button variant="contained" onClick={() => signOut()}>Sign out</Button>
        </Layout>
    );
};

export default IndexPage;
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
