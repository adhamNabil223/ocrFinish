import { url } from '@/components/api/config';
import withAuth from '@/components/auth/Authentication';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';



function upload() {

  let [file, setFile] = useState(null);
  let [file2, setFile2] = useState(null);
  const [loader, setLoader] = useState(false)
  const router = useRouter()
  const {t} = useTranslation()
  const handleChange = (file) => {
    setFile(file);
  };
  const handleChange2 = (file) => {
    setFile2(file)
  };
  const fileTypes = ["PDF"];

  async function sendFiles(e) {
    setLoader(true)
    e.preventDefault()
    if(file2 === null || file === null){
      toast.error('kindly upload the files')
    }else{
    var formdata = new FormData();
    formdata.append("certificate", file2[0], file2[0].name);
    formdata.append("national_id", file[0], file[0].name);

var requestOptions = {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${Cookies.get('token')}`,
  },
  body: formdata,
};

const x = await fetch(`${url}documents/`, requestOptions)
  .then(response =>
    {
   if(response.status === 201 || response.status === 200){
    return  response.json()
   }else if(response.status === 500 || response.status === 502){
    toast.error('Server Down')
   }else if(response.status === 401){
    Cookies.remove('token')
    localStorage.clear()
    router.push('/')
   }
   else{
    toast.error('File Not Accepted')
   }
  }
  
  )
  .then(result =>{
    router.push(`/certficate/${result.id}`)
  }).catch(err =>   setLoader(false))
    }
    setLoader(false)
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold mb-4">{t('UploadPage')}</h1>
      <form className='flex flex-col gap-5' onSubmit={sendFiles} encType='multipart/form-data'>
      <div className='m-auto w-[fit-content]'>
      <FileUploader
        multiple={true}
        handleChange={handleChange2}
        name="file"
        types={["PDF"]}
      />
      </div>
      <div className='m-auto w-[fit-content]'>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={["png" , "jpg"]}
      />
      </div>
      
        {
          loader ? 
          <div className='text-center'>
          <ClipLoader color="#3b82f6" />
          </div>
           : <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 m-auto w-[fit-content] block"
        > 
        upload
        </button>
        }
       
      
      </form>
    </div>
  )
}

export default withAuth(upload)





