import React from 'react';
const propertis = [
  { p1: 'Szybka diagnoza', p2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam molestias non nesciunt ipsa, obcaecati mollitia unde neque dicta.' },
  { p1: 'Wizyta online', p2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam molestias non nesciunt ipsa, obcaecati mollitia unde neque dicta.' },
  { p1: 'Apteka online', p2: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam molestias non nesciunt ipsa, obcaecati mollitia unde neque dicta.' },
];

export const About = () => {
  return (
    <div className='w-full py-20'>
      <div className='max-w-6xl mx-auto px-2'>
        <div className='text-start '>
          <h1 className='text-4xl font-bold'>O nas</h1>
          <p className=' py-8 text-gray-600'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi earum necessitatibus voluptate a molestias neque rerum! Ab magnam, quos distinctio ea, temporibus nostrum hic eaque eos, quisquam at
            ut? Esse?
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-5 px-4 text-center'>
          {propertis.map((value) => (
            <div className='bg-white border py-8 rounded-xl shadow-xl'>
              <p className='text-xl font-bold text-violet-700'>{value.p1}</p>
              <p className='text-gray-600 mt-2 px-6'>{value.p2}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
