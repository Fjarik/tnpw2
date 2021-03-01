import { GetServerSideProps, NextPage } from "next";
import { withAuthServerSideProps } from "../components/auth/AuthWrapper";
import Contacts from "../components/Contacts/Contacts";
import Layout from "../components/Layout/Layout";
import { IContact } from "../interfaces/IContact";

const IndexPage: NextPage = ({ }) => {
    const contacts: IContact[] = [
        { id: "0", firstName: "Test", lastName: "Test", nickName: "Test", email: "test@test.com", number: "123456789", birthDate: "2021-03-01" },
        { id: "1", firstName: "Test", lastName: "Test", nickName: "Test", email: "test@test.com", number: "123456789", birthDate: "2021-03-01" },
        { id: "2", firstName: "Test", lastName: "Test", nickName: "Test", email: "test@test.com", number: "123456789", birthDate: "2021-03-01" },
    ];

    return (
        <Layout title="Home">

            <Contacts contacts={contacts} />
        </Layout>
    );
};

export default IndexPage;
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
