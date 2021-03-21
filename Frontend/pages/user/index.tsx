import { GetServerSideProps, NextPage } from "next";
import { withAuthServerSideProps } from "@components/auth/AuthWrapper";
import Layout from "@components/Layout/Layout";
import Profile from "@components/User/Profile";

const ProfilePage: NextPage = () => {

    return (
        <Layout title="User Profile">
            <Profile />
        </Layout>
    );
};

export default ProfilePage;
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
