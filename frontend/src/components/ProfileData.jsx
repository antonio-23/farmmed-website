import React from 'react';

export const ProfileData = ({ first_name, last_name, date }) => {
  return (
    <div className='flex flex-col items-center py-4 gap-y-6 text-lg'>
      <span>{first_name}</span>
      <span>{last_name}</span>
      <span>{date}</span>
    </div>
  );
};
