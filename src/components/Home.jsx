import { useContext, useEffect } from 'react';
import { ThemeContext, useTheme } from "../contexts/ThemeContext.jsx";
import { FaSun, FaMoon } from 'react-icons/fa';


function Home() {
  const { darkMode, toggleThemeMode } = useTheme();
  const context = useContext(ThemeContext);
  console.log(context);
  
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);
  
  return (
    <div className="p-3">
      <button 
        onClick={toggleThemeMode}
        className='theme-toggle'
      >
        {darkMode ? <FaSun size={25} /> : <FaMoon size={25} /> }
      </button>
    </div>
  );
}

export default Home;
