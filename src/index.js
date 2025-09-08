import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
const App = lazy(() => import('./App'));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div />}> 
      <App />
    </Suspense>
  </React.StrictMode>
);

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_VERCEL_ANALYTICS_ID) {
  reportWebVitals(sendToVercelAnalytics);
}
