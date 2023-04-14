import React from 'react';
import notFoundPicture from '../assets/404Picture.png';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className='p-20 flex'>
      <img src={notFoundPicture} alt='not found Picture' />
      <h1 className='text-4xl'>
        Ludzie przecież tu nikogo nie ma{' '}
        <p>
          Wracaj na{' '}
          <Link className='underline' to='/'>
            stronę główną
          </Link>
        </p>
      </h1>
    </div>
  );
};
