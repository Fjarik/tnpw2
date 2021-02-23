import { AppComponent, AppProps } from "next/dist/next-server/lib/router/router";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "next-auth/client";
import ThemeContainer from "../components/Themes/ThemeContainer";


const CustomApp: AppComponent = ({ Component, pageProps }: AppProps) => {

    return (
        <Provider session={pageProps.session}>
            <ThemeContainer>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeContainer>
        </Provider>
    );
};

export default CustomApp;