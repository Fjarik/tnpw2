import { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { useEffect } from "react";
import { withAuthServerSideProps } from "../components/auth/AuthWrapper";
import Layout from "../components/Layout/Layout";

const IndexPage: NextPage = ({ }) => {
    const [session, loading] = useSession();

    useEffect(() => {
        console.log(session);
    }, [session]);

    return (
        loading ?
            <></>
            :
            <Layout title="Home | Next.js + TypeScript Example">
                <h1>Hello Next.js 👋</h1>
                <p>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </p>
                {
                    session ?
                        <>
                            <p>Signed in</p>
                            <button onClick={() => signOut()}>Sign out</button>
                        </>
                        :
                        <p>Sign in</p>
                }
            </Layout>
    );
};

export default IndexPage;
export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
