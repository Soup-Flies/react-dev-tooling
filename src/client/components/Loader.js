import React from 'react';
import './styles/loaderStyle.css';

const loaderWrapper = {
  margin: '0 auto',
  background: '#FFFFFF'
};

// A copy pasted loading animation as a functional component that would never need state or a constructor
const Loader = () => (
  <div style={loaderWrapper}>
    <div className="loader">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
