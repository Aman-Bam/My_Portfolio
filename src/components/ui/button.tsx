import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => {
  return (
    <button {...props} className={`inline-flex items-center px-4 py-2 rounded bg-blue-600 text-white ${className}`}>
      {children}
    </button>
  );
};

export default Button;
