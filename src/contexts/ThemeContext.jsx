import { createContext, useContext, useState, useMemo } from "react";

export const ThemeContext = createContext();



export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const value = useMemo(() => ({
        darkMode,
        toggleThemeMode: () => setDarkMode(prevMode => !prevMode)
      }), [darkMode]);
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
            {console.log(value)}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ThemeContext);
}

