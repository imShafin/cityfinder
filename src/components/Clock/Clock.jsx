import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [showLocalTime, setShowLocalTime] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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