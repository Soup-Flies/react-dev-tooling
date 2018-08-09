import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import './styles.css';

if (process.env.NODE_ENV !== 'production') console.log('Development is live on the client');
else {
  // Dont have cache busting for development in yet so any service workers would be implemented in production
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
