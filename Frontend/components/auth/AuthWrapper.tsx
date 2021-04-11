import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";

export const withAuthServerSideProps = (getServerSidePropsFn?: (context: GetServerSidePropsContext) => Promise<GetServerSideProps>): GetServerSideProps => {
    return async (ctx: GetServerSidePropsContext) => {
        const session = await getSession(ctx);
        if (!session) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/auth/signin"
                }
            };
        }
        if (getServerSidePropsFn) {
            const data = await getServerSidePropsFn(ctx);
            return {
                props: {
                    data,
                },
            };
        }
        return {
            props: {
            }
        };
    };
};
