import React from 'react';

export const HelloName = (props) => {
  return (
    <div className='pt-10 pl-10'>
      <h1 className='text-4xl font-bold'>Witaj, {props.name}</h1>
    </div>
  );
};
