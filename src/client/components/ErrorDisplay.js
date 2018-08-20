import React from 'react';
import PropTypes from 'prop-types';

const getErrorType = input => {
  const base = 'team name should not';
  if (!input.length) return `${base} be empty`;
  else if (/ /.test(input)) return `${base} have spaces`;
  else if (/\W/.test(input)) return `${base} contain symbols`;
  else if (input.length > 15) return `${base} be over 15 characters`;
};

// Extensible and reusable error message component that internally determines the error from the given input
const ErrorDisplay = ({ input }) => <p className="error-message">{getErrorType(input)}</p>;

ErrorDisplay.propTypes = {
  input: PropTypes.string.isRequired
};

export default ErrorDisplay;
