import { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/client";
import { withAuthServerSideProps } from "../../components/auth/AuthWrapper";
import Layout from "../../components/Layout/Layout";

const ProfilePage: NextPage = () => {
    const [session, loading] = useSession();

    if (loading || !session) {
        return <></>;
    }

    const { user } = session;

    return (
        <Layout title="User Profile">
            {JSON.stringify(user)}
        </Layout>
    );
};

export default ProfilePage;
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
