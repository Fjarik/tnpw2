import { NextPage } from "next";
import { csrfToken } from "next-auth/client";

interface IProps {
    token?: string
}

const SignIn: NextPage<IProps> = ({ token }) => {
    return (
        <form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={token} />
            <label>
                Username
        <input name='username' type='text' />
            </label>
            <label>
                Password
        <input name='password' type='text' />
            </label>
            <button type='submit'>Sign in</button>
        </form>
    );
};

SignIn.getInitialProps = async (context) => {
    return {
        token: await csrfToken(context) ?? ""
    };
};

export default SignIn;