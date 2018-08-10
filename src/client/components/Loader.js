import React from 'react';
import './styles/loaderStyle.css';

const loaderWrapper = {
  margin: '0 auto',
  background: '#FFFFFF'
};

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
