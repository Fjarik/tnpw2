import { AppComponent, AppProps } from "next/dist/next-server/lib/router/router";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "next-auth/client";
import theme from "../styles/theme";


const CustomApp: AppComponent = ({ Component, pageProps }: AppProps) => {


    return (
        <Provider session={pageProps.session}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    );
};

export default CustomApp;