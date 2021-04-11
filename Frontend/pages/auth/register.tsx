import { NextPage } from "next";
import Register from "@components/User/SignUp";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const RegisterPage: NextPage = () => {
    const router = useRouter();
    const [session, loading] = useSession();

    if (loading) {
        return <></>;
    }
    if (session) {
        router.push("/");
        return <></>;
    }

    return (
        <>
            <Register />
        </>
    );
};

export default RegisterPage;
