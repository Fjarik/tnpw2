import { createMuiTheme, Theme, ThemeOptions } from "@material-ui/core";
import { blue, orange } from "@material-ui/core/colors";
import { Themes } from "./ThemeContainer";

const getTheme = (theme: Themes): Theme => {
    const mainTheme: ThemeOptions = {
        palette: {
            primary: blue,
            secondary: orange
        },
    };

    const lightTheme = createMuiTheme({
        palette: {
            ...mainTheme.palette,
            type: "light",
        },
    });

    const darkTheme = createMuiTheme({
        palette: {
            ...mainTheme.palette,
            type: "dark"
        },
    });
    return theme === Themes.dark ? darkTheme : lightTheme;
};

export default getTheme;