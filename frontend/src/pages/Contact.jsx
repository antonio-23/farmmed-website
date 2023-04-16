import React from 'react';
import { Cards } from '../components/Cards';

export const Contact = () => {
  return (
    <div name='contact' className='w-full py-20 px-4'>
      <div className='text-start max-w-6xl mx-auto px-2 pb-14'>
        <h1 className='text-4xl font-bold'>Opinie naszych klientów</h1>
      </div>
      <div className='max-w-7xl mx-auto grid md:grid-cols-3 gap-8'>
        <Cards />
      </div>
    </div>
  );
};
