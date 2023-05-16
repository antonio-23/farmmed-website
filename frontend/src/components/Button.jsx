import React from 'react';

export const Button = ({ children, customClass }) => {
  return <button className={`bg-violet-600 text-white px-8 py-3 rounded-md hover:bg-violet-700 ` + customClass}>{children}</button>;
};
