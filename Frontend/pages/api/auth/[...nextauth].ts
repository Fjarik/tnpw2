import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { LoginAsync } from "../../../services/authService";

const options: InitOptions = {
    providers: [
        Providers.Credentials({
            name: "Username & Password",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Your username" },
                password: { label: "Password", type: "password", placeholder: "Your password" }
            },
            authorize: async ({ username, password }) => {
                console.log(username);
                console.log(password);
                const user = await LoginAsync({ username, password });
                if (user) {
                    return user;
                }
                return null;
            }
        }),
    ],
    session: {
        jwt: true
    }
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);