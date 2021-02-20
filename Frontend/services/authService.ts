
interface ILoginProps {
    username: string,
    password: string
}

interface ILoginResult {
    token: string;
}


export const GetAPI = (endpoint: string): string => {
    return process.env.API_URL + "/" + endpoint;
};

export const LoginAsync = async (props: ILoginProps): Promise<ILoginResult | null> => {
    if (!props || !props.username || !props.password) {
        return null;
    }

    try {
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
        const content = await res.json();

        console.log(content);
        if (res.status == 200) {
            return {
                token: content.token,
            };
        }

    } catch (e) {
        console.log(e);
    }

    return null;
};