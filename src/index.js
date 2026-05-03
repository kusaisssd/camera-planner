import React from 'react';


import ReactDOM from 'react-dom/client';
import './styles.css';  // هنا استدعاء Tailwind
import './mobile-improvements.css';
import App from './App.jsx';

import './styles.css'; // ← هذا مهم جدًا
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);