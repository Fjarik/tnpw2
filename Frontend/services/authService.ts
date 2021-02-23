
interface ILoginProps {
    username: string;
    password: string;
}

export interface IUserModel {
    UserName: string;
    Email: string;
    FirstName: string;
    LastName: string;
}

export interface ILoginResult {
    User: IUserModel;
    token: string;
}


export const GetAPI = (endpoint: string): string => {
    return process.env.API_URL + "/" + endpoint;
};

export const LoginAsync = async (props: ILoginProps): Promise<ILoginResult | null> => {
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
    try {
        if (res.status == 200) {
            return await res.json() as ILoginResult;
        }
    } catch {

    }

    return null;
};