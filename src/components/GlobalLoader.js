import React, { useState, useEffect } from 'react';
import './GlobalLoader.css';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoaderEvent = (event) => {
      setIsLoading(event.detail.isLoading);
    };

    window.addEventListener('global-loader', handleLoaderEvent);
    return () => {
      window.removeEventListener('global-loader', handleLoaderEvent);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default GlobalLoader;