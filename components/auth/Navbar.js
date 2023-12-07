import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select'

function Navbar({ userName, onSignOut }) {
  const {t} = useTranslation()

  const options = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' }
  ]

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center" id='nav'>
      <div className="text-white font-semibold">{userName}</div>
      <div className="flex gap-5">
      {/* <Select options={options} defaultValue={options[0]} onChange={(e)=>{
        if(e.value == "ar"){
          const myWindow = document.getElementById('main')
          myWindow.style.direction = "rtl" 
        }else{
          const myWindow = document.getElementById('main')
          myWindow.style.direction = "ltr" 
        }
        i18next.changeLanguage(e.value)
        }} /> */}
        <button onClick={onSignOut} className="hover:underline text-white">
          {t('signOut')}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;