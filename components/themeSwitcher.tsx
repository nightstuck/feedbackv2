import {useTheme} from "next-themes";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            The current theme is: {theme}
            <button onClick={() => setTheme('light')}>Light Mode</button>
            <button onClick={() => setTheme('green-dark')}>Dark Mode</button>
        </div>
    );
};

export default ThemeSwitcher;