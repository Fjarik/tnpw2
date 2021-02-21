import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { GenericObject } from "next-auth/_utils";
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
                const user = await LoginAsync({ username, password });
                // console.log("Logged user:", user);
                if (user) {
                    return user;
                }
                return null;
            }
        }),
    ],
    callbacks: {
        jwt: async (token, payload: GenericObject): Promise<GenericObject> => {
            if (payload && payload.Token) {
                token.accessToken = payload.Token;
                if (payload.User) {
                    token.User = payload.User;
                }
            }
            return token;
        },
        session: (session, payload: GenericObject): Promise<GenericObject> => {
            if (payload && payload.accessToken) {
                session.accessToken = payload.accessToken;
                if (payload.User) {
                    session.user = payload.User;
                }
            }
            return Promise.resolve(session);
        }
    },
    session: {
        jwt: true
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,

    }
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);