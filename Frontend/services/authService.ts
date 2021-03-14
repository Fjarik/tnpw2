import { LoggedUser, LoginInput } from "./generated";

export const GetAPI = (endpoint: string): string => {
    return process.env.NEXT_PUBLIC_API_URL + "/" + endpoint;
};

export const LoginAsync = async (props: LoginInput): Promise<LoggedUser | null> => {
    if (!props || !props.username || !props.password) {
        return null;
    }
    const url = GetAPI("auth/login");
    const res = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(props),
    });

    if (!res || !res.json) {
        return null;
    }
    if (res.status == 503) {
        return null;
    }
    if (res.status == 200) {
        try {
            return await res.json() as LoggedUser;
        } catch (e) {
            console.log(e);
        }
    }

    return null;
};