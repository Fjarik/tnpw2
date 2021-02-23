import { FunctionComponent, useContext } from "react";
import { IconButton } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { CustomThemeContext, Themes } from "./ThemeContainer";

const ThemeChangeButton: FunctionComponent = () => {
    const { currentTheme, setTheme } = useContext(CustomThemeContext);

    const isDark = currentTheme === Themes.dark;

    const changeTheme = (): void => {
        setTheme(isDark ? Themes.light : Themes.dark);
    };

    const themeText = (isDark)
        ?
        "Change to light theme"
        :
        "Change to dark theme";

    const themeIcon = (isDark)
        ?
        <Brightness7Icon />
        :
        <Brightness4Icon />;

    return (
        <IconButton
            onClick={changeTheme}
            title={themeText}
            color="inherit"
        >
            {themeIcon}
        </IconButton>
    );
};

export default ThemeChangeButton;