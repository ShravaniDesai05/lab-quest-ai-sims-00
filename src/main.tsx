
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log app initialization for debugging
console.log(`Starting ${import.meta.env.VITE_APP_NAME || 'VigyaanKosh: AI-Powered Virtual Science Labs'}`);
console.log(`Theme: ${localStorage.getItem('vk-theme') || 'system'}`);

// Initialize system preference detection for theme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('vk-theme');

// Add appropriate class to root element
document.documentElement.classList.add(
  storedTheme === 'dark' || 
  (storedTheme !== 'light' && prefersDark) 
    ? 'dark' 
    : 'light'
);

// Add meta theme color tag
const metaTheme = document.createElement('meta');
metaTheme.name = 'theme-color';
metaTheme.content = (storedTheme === 'dark' || (storedTheme !== 'light' && prefersDark)) ? '#171717' : '#ffffff';
document.head.appendChild(metaTheme);

// Render the application
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
