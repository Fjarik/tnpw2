import { GetServerSideProps, NextPage } from "next";
import { withAuthServerSideProps } from "@components/auth/AuthWrapper";
import Contacts from "@components/Contacts/Contacts";
import Layout from "@components/Layout/Layout";


const IndexPage: NextPage = () => {
    return (
        <Layout title="Home">
            <Contacts />
        </Layout>
    );
};

export default IndexPage;
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
