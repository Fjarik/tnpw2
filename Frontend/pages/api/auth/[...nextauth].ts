import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Providers from "next-auth/providers";
import { WithAdditionalParams } from "next-auth/_utils";
import { LoginAsync, LogoutAsync } from "../../../services/authService";
import { LoggedUser } from "../../../services/generated";

const options: NextAuthOptions = {
    providers: [
        Providers.Credentials({
            name: "Username & Password",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Your username" },
                password: { label: "Password", type: "password", placeholder: "Your password" }
            },
            authorize: async (credentials) => {
                const user = await LoginAsync(credentials);
                // console.log("Logged user:", user);
                if (user) {
                    return user as User;
                }
                return null;
            }
        }),
    ],
    callbacks: {
        jwt: async (token, payload: unknown): Promise<WithAdditionalParams<JWT>> => {
            const p = payload as LoggedUser;
            if (p && p.token) {
                token.accessToken = p.token;
                if (p.user) {
                    token.user = p.user;
                }
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session: async (session: Session, payload: any): Promise<WithAdditionalParams<Session>> => {
            if (payload && payload.accessToken) {
                session.accessToken = payload.accessToken as string;
                if (payload.user) {
                    session.user = payload.user as WithAdditionalParams<User>;
                }
            }
            return session as WithAdditionalParams<Session>;
        }
    },
    events: {
        signOut: async (message: Session): Promise<void> => {
            await LogoutAsync(message?.accessToken);
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

export default NextAuth(options);