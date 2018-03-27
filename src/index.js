import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App.js';


if (process.env.NODE_ENV !== 'production') console.log("this is dev mode")
else console.log("this is prod mode");

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

ReactDOM.render(<App />, document.getElementById('app'));


// import './styles.css';
// import _ from 'lodash';

// function component() {
//   var element = document.createElement('div');

//   var button = document.createElement('button');
//   var br = document.createElement('br');

//   button.innerHTML = 'Click me and look at the console!';
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.appendChild(br);
//   element.appendChild(button);

//   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
//     var print = module.default;

//     print();
//   })

//   return element;
// }

// document.body.appendChild(component());