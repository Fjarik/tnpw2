import { GetServerSideProps, NextPage } from "next";
import { withAuthServerSideProps } from "../components/auth/AuthWrapper";
import Contacts from "../components/Contacts/Contacts";
import Layout from "../components/Layout/Layout";

interface IProps {
    apiUrl: string
}
const IndexPage: NextPage<IProps> = ({ apiUrl }) => {
    return (
        <Layout title="Home">
            <Contacts apiUrl={apiUrl} />
        </Layout>
    );
};

export default IndexPage;
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
