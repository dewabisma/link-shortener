import React from "react";

const ErrorFallback = ({ children }) => {
  return (
    <div role="alert" className="error-wrapper">
      <div className="error">{`HTTP Request Error: ${children}`}</div>
    </div>
  );
};

export default ErrorFallback;
