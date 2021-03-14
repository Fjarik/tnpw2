import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { GenericObject } from "next-auth/_utils";
import { LoginAsync } from "../../../services/authService";
import { LoggedUser } from "../../../services/generated";

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
        jwt: async (token, payload: unknown): Promise<GenericObject> => {
            const p = payload as LoggedUser;
            if (p && p.token) {
                token.accessToken = p.token;
                if (p.user) {
                    token.user = p.user;
                }
            }
            return token;
        },
        session: async (session, payload: GenericObject): Promise<GenericObject> => {
            if (payload && payload.accessToken) {
                session.accessToken = payload.accessToken;
                if (payload.user) {
                    session.user = payload.user;
                }
            }
            return session;
        }
    },
    events: {
        signOut: async (message): Promise<void> => {
            console.log(message);
        },
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days 
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
        maxAge: 30 * 24 * 60 * 60, // 30 days 
    }
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, options);