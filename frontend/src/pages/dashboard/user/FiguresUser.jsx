import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';

const Menu = () => {
  return (
    <>
      {' '}
      <div className='flex flex-col gap-y-2 pt-4'>
        <p className='border-b ml-4'>Cel wizyty</p>
        <p className='border-b ml-4'>Objawy</p>
        <p className='border-b ml-2'>Wyniki badań</p>
        <p className='border-b ml-4'>Zalecenia</p>
        <p className='border-b ml-4'>Termin kolejnej wizyty</p>
      </div>
      <div className='flex flex-col gap-y-2 pt-4'>
        <p className='border-b mr-4'>Leczenie choroby</p>
        <p className='border-b mr-4'>Chory nie zdał plichty</p>
        <p className='border-b mr-4'>Chory jest głupi tak samo jak lekarz</p>
        <p className='border-b mr-4'>Zrezygnować ze studiów</p>
        <p className='border-b mr-4'>Po odebraniu papierów</p>
      </div>
    </>
  );
};

export const FiguresUser = () => {
  const [menu, setMenu] = useState(false);
  const [figuresList, setFiguresList] = useState([]);

  const closeMenu = () => setMenu(false);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <div className='flex justify-center'>
      <div className='lg:h-[30rem] 2xl:h-[60rem] w-full overflow-auto'>
        <div className='text-center py-6 mx-10'>
          <div className='grid grid-cols-2 grid-flow-cols py-4 items-center text-lg font-bold'>
            <p>Data</p>
            <p>Doktor</p>
          </div>
          <div className='grid grid-cols-2 grid-flow-cols py-4 items-center border rounded-xl bg-white hover:bg-violet-100'>
            <p>2023-05-01</p>
            <p>Jan Stachura</p>
            {menu ? <Menu /> : null}
            <div onClick={handleClick} className='grid col-span-2 justify-center'>
              {menu ? <MdOutlineKeyboardDoubleArrowUp size={20} /> : <MdOutlineKeyboardDoubleArrowDown size={20} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
