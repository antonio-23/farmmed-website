import React from 'react';
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im';

const properties = [{ name: 'Barbara Nowak' }, { name: 'Piotr Kowalski' }, { name: 'Jan Kowalczyk' }];

export const Cards = () => {
  return (
    <>
      {properties.map((property) => (
        <div key={property.name} className='w-full flex flex-col p-4 my-4 bg-white border py-8 rounded-xl shadow-xl'>
          <h2 className='text-2xl text-center py-8 font-bold'>{property.name}</h2>
          <p className='py-2 mx-8 text-center text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus incidunt eum dolores pariatur rerum omnis numquam atque dolorum optio similique suscipit et nam nostrum, hic, sunt debitis deserunt
            expedita obcaecati.
          </p>
          <div className='flex justify-center gap-2 py-8'>
            <ImStarFull color='#883AE1' />
            <ImStarFull color='#883AE1' />
            <ImStarFull color='#883AE1' />
            <ImStarFull color='#883AE1' />
            <ImStarHalf color='#883AE1' />
          </div>
        </div>
      ))}
    </>
  );
};
