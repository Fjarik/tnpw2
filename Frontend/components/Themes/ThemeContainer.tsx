import { ThemeProvider, useMediaQuery } from "@material-ui/core";
import { createContext, FunctionComponent, useEffect, useState } from "react";
import localStorageKeys from "../../utils/StorageConstants";
import getTheme from "./Themes";

export enum Themes {
    light,
    dark,
}

export interface ICustomThemeContext {
    currentTheme: Themes,
    setTheme: (theme: Themes) => boolean;
}

export const CustomThemeContext = createContext<ICustomThemeContext>({
    currentTheme: Themes.light,
    setTheme: () => false,
});

const ThemeContainer: FunctionComponent = ({ children }) => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferedTheme = prefersDarkMode ? Themes.dark : Themes.light;

    const [currentTheme, setThemeState] = useState<Themes>(preferedTheme);

    useEffect(() => {

        const fromStorage = localStorage.getItem(localStorageKeys.theme);
        const dark = fromStorage ? fromStorage === Themes.dark.toString() : prefersDarkMode;

        setThemeState(dark ? Themes.dark : Themes.light);
    }, [prefersDarkMode]);


    const setTheme = (theme: Themes): boolean => {
        setThemeState(theme);
        if (localStorage) {
            localStorage.setItem(localStorageKeys.theme, theme.toString());
            return true;
        }
        return false;
    };

    const contextValue: ICustomThemeContext = {
        currentTheme,
        setTheme
    };

    const theme = getTheme(currentTheme);

    return <CustomThemeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </CustomThemeContext.Provider>;
};

export default ThemeContainer;