import React from 'react';

export const SearchField = ({ value, onChange, max }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <input
        type='search'
        name='searchField'
        id='searchField'
        className='border rounded-lg border-gray-300 w-[50%] focus:outline-0 p-4 shadow-inner shadow-gray-200'
        placeholder='Wyszukaj'
        value={value}
        onChange={onChange}
        maxLength={max}
      />
    </div>
  );
};
