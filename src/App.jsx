import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './components/Home';
import WorldMap from './components/WorldMap/WorldMap';

function App() {
  return (
    <ThemeProvider>
      <div className="app-layout">
        <Home />
        <WorldMap />
        {/* <Clock /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;