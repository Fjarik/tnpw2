import { LoggedUser, LoginInput } from "./generated";

export const GetAPI = (endpoint: string): string => {
    return process.env.NEXT_PUBLIC_API_URL + "/" + endpoint;
};

const LoginAsyncInternal = async (props: LoginInput): Promise<LoggedUser | null> => {
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

export const LoginAsync = async (credentials: Record<string, string>): Promise<LoggedUser | null> => {
    const username = credentials["username"];
    const password = credentials["password"];

    return await LoginAsyncInternal({ username, password });
};


export const LogoutAsync = async (token?: string): Promise<boolean> => {
    if (!token || token.length < 10) {
        return false;
    }
    const url = GetAPI("auth/logout");
    const res = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    });

    if (!res || !res.body) {
        return false;
    }
    return res.status === 200;
};
