import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';

const contactInfo = [
  {
    icon: <HiPhone color='#883AE1' size={30}></HiPhone>,
    text: '+48 111 222 333',
  },
  {
    icon: <FaMapMarkerAlt color='#883AE1' size={30} />,
    text: 'Pogodna 33, Nowy Sącz, Nowy Sącz 33-300',
  },
  {
    icon: <HiMail color='#883AE1' size={30} />,
    text: 'farmmed@example.com',
  },
];

// const footerInfo = [
//   {
//     name: 'Serwis',
//     options: ['O nas', 'Kontakt', 'Partnerzy'],
//   },
//   {
//     name: 'Dla pacjentów',
//     options: ['Lekarze', 'Placówki medyczne', 'Pytania i odpowiedzi'],
//   },
//   {
//     name: 'Dla profesjonalistów',
//     options: ['Cennik', 'Dla lekarzy', 'Baza wiedzy'],
//   },
// ];

export const Footer = () => {
  return (
    <div className='bg-ghostwithe'>
      <div className='max-w-7xl mx-auto py-16 px-4 grid lg:grid-cols-2 gap-8'>
        <div>
          <h1 className='w-md text-2xl'>
            <NavLink to='/'>FarMMed</NavLink>
          </h1>
          <ul>
            {contactInfo.map((value, index) => (
              <li className='flex my-6' key={index}>
                {value.icon}
                <p className='flex items-center px-8'>{value.text}</p>
              </li>
            ))}
          </ul>
          <div className='flex justify-between w-[25%] my-8'>
            <FaFacebook color='#883AE1' size={30} />
            <FaInstagram color='#883AE1' size={30} />
            <FaTwitter color='#883AE1' size={30} />
          </div>
        </div>
        <div className='flex justify-between'>
          {/* <div className='flex'>
          {footerInfo.map((value,index)=> (
            <div key={index} className='flex justify-between'>
               <h6 className='font-medium text-gray-500'>{value.name}</h6>
               <ul>
                  {value.options.map((value,index)=>(
                     <li className='py-2 text-sm' key={index}>{value}</li>
                  ))}
               </ul>
            </div>
          ))} */}
          <div className='px-10'>
            <h6 className=' text-lg'>Serwis</h6>
            <ul>
              <li className='py-2 text-sm text-gray-500'>O nas</li>
              <li className='py-2 text-sm text-gray-500'>Kontak</li>
              <li className='py-2 text-sm text-gray-500'>Partnerzy</li>
            </ul>
          </div>
          <div className='px-10'>
            <h6 className='font-lg '>Dla pacjentów</h6>
            <ul>
              <li className='py-2 text-sm text-gray-500'>Lekarze</li>
              <li className='py-2 text-sm text-gray-500'>Placówki medyczne</li>
              <li className='py-2 text-sm text-gray-500'>Pytania i odpowiedzi</li>
            </ul>
          </div>
          <div className='px-10'>
            <h6 className='font-lg '>Dla lekarzy</h6>
            <ul>
              <li className='py-2 text-sm text-gray-500'>Cennik</li>
              <li className='py-2 text-sm text-gray-500'>Dla lekarzy</li>
              <li className='py-2 text-sm text-gray-500'>Baza wiedzy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
