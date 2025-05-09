
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log app initialization for debugging
console.log(`Starting ${import.meta.env.VITE_APP_NAME || 'VigyaanKosh: AI-Powered Virtual Science Labs'}`);
console.log(`Theme: ${localStorage.getItem('vk-theme') || 'system'}`);

// Initialize system preference detection for theme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.add(
  localStorage.getItem('vk-theme') === 'dark' || 
  (localStorage.getItem('vk-theme') !== 'light' && prefersDark) 
    ? 'dark' 
    : 'light'
);

// Render the application
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
