import { AppComponent, AppProps } from "next/dist/next-server/lib/router/router";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Provider } from "next-auth/client";
import ThemeContainer from "../components/Themes/ThemeContainer";


const CustomApp: AppComponent = ({ Component, pageProps }: AppProps) => {

    return (
        <Provider session={pageProps.session}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <ThemeContainer>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeContainer>
            </MuiPickersUtilsProvider>
        </Provider>
    );
};

export default CustomApp;