import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";

export const withAuthServerSideProps = (getServerSidePropsFn?: (context: GetServerSidePropsContext) => Promise<GetServerSideProps>): GetServerSideProps => {
    return async (ctx: GetServerSidePropsContext) => {
        const session = await getSession(ctx);
        if (!session) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/api/auth/signin"
                }
            };
        }
        const apiUrl = process.env.BASE_API_URL;
        if (getServerSidePropsFn) {
            const data = await getServerSidePropsFn(ctx);
            return {
                props: {
                    data,
                    apiUrl
                },
            };
        }
        return {
            props: {
                apiUrl
            }
        };
    };
};
