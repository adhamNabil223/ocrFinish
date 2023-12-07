import { instance } from '@/components/api/config';
import withAuth from '@/components/auth/Authentication';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import { ClipLoader } from 'react-spinners';

function SettingsPage() {
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confNewPass, setConfNewPass] = useState('');
  const [loading, updateLoading] = useState(false);
  const {t} = useTranslation()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }; 

async  function change(close) {
  updateLoading(true)
  close()
    if(!password){
      toast.error('no updates made')
    }else if(newPass !== confNewPass){
      toast.error('new passwords did not match!')
    }else{
      const x = await instance.patch('users/change-password/' , {
        "password": password,
        "new_password": newPass,
        "confirm_password": confNewPass
      })
       updateLoading(false)
      if(x.status === 200){
        toast.success('file updated')
        setPassword('')
        setNewPass('')
        setConfNewPass('')
      }
    }
  }



  return (
    <div className="p-4">
    {
      loading && 
      <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[500] bg-[#00000061]'>
        <ClipLoader color="#3b82f6"/>
      </div>
    }
      <h1 className="text-2xl font-semibold mb-4">Settings Page</h1>
      <form onSubmit={(e)=>e.preventDefault()}>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          {t('oldPass')}:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
         {t('NewPass')}:
        </label>
        <input
          type="password"
          id="password"
          value={newPass}
          onChange={(e)=>setNewPass(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
       {t('ConfirmNewPass')}:
        </label>
        <input
          type="password"
          id="password"
          value={confNewPass}
          onChange={(e)=>setConfNewPass(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className='text-end'>
    <Popup
     trigger={<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Update </button>}
     modal
     nested
    >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header">{t('updateProf')} </div>
        <div className="content">
         {t('cofirm')}
        </div>
      <div className='flex justify-between items-center'>
     <button onClick={()=>{
      change(close)
      }}  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">{t('Update')}</button>
     <button onClick={close}  type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{t('cancel')}</button>
     </div>
      </div>
    )}
  </Popup>
      </div>
      </form>
    </div>
  );
}

export default withAuth(SettingsPage) ;