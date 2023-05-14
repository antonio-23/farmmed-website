import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const Footer = () => {
  const [contactInfo, setContactinfo] = useState([
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
  ]);

  const [footerInfo, setFotterInfo] = useState([
    {
      name: 'Serwis',
      options: ['O nas', 'Kontakt', 'Partnerzy'],
    },
    {
      name: 'Dla pacjentów',
      options: ['Lekarze', 'Placówki medyczne', 'Pytania i odpowiedzi'],
    },
    {
      name: 'Dla lekarzy',
      options: ['Cennik', 'Dla lekarzy', 'Baza wiedzy'],
    },
  ]);

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
                <p key={index} className='flex items-center px-8'>
                  {value.text}
                </p>
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
          {footerInfo.map((value) => (
            <div key={value.name} className='px-10'>
              <div>
                <h6 className='text-lg py-2'>{value.name}</h6>
                <ul>
                  {value.options.map((option) => (
                    <li key={option} className='py-2 text-sm text-gray-500'>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
