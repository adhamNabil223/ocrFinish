import { instance } from '@/components/api/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
 function Login() {
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const {t} = useTranslation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    const forms = e.target
    const x = await  instance.post('auth/tokens/' , {
      "login" : forms.elements.name.value , 
      "password" : forms.elements.password.value
    }).then(res =>{
      if(res.status === 200){
        router.push('/')
        toast.success('welcome back')
        Cookies.set('token' ,res.data.tokens.access)
        localStorage.setItem('user' , JSON.stringify(res.data))
      }
    }).catch(err =>{
      toast.error(err.response.data.detail)
    }
    )
    setLoader(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">{t('login')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              {t('email')}:
            </label>
            <input
              type="email"
              id="email"
              name='name'
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              {t('Pass')}:
            </label>
            <input
              type="password"
              id="password"
              name='password'
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          {
            loader ? 
            <div className='text-center'>
            <ClipLoader color="#3b82f6" />
            </div>
            : 
            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign in
          </button>
          }
         
          <p className='mt-5'>Don't Have an Account ? <Link href={'/register'} className='text-[blue] underline'>Register</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;