import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CountryCode, DATA } from '../../const';
import tm from '../../jsonData/timeZone.json';

const Clock = ({ onSearch }) => {
  console.log();
  const [time, setTime] = useState(new Date());
  const [showLocalTime, setShowLocalTime] = useState(true);

    useEffect(() => {
    if (!onSearch || typeof onSearch !== 'string') {
      return;
    }

    const country = tm.countries.find(country => {
      if (!country?.name || typeof country.name !== 'string') return false;
      return country.name.toLowerCase() === onSearch.toLowerCase();
    });

    const timeOffset = country ? country.timezone_offset * 3600000 : 0;
    
    const timer = setInterval(() => {
      setTime(new Date(Date.now() - 21600000 + timeOffset));
    }, 1000);

    return () => clearInterval(timer);
  }, [onSearch]);

  const toggleTimeFormat = () => {
    setShowLocalTime(!showLocalTime);
  };

  const formatTime = (date, isLocal) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: isLocal // Show AM/PM only for local time
    };
    return date.toLocaleTimeString([], options);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999
    }}>
      <Button 
        variant="outline-primary" 
        onClick={toggleTimeFormat}
        style={{ minWidth: '150px', fontSize: '1.5rem', padding: '10px 20px', fontFamily: 'monospace' }}
      >
        {formatTime(time, showLocalTime)}
      </Button>
    </div>
  );
};

export default Clock;
