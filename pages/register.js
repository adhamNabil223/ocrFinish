import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { instance } from '@/components/api/config';
import Joi from 'joi';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Register() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false)


  const handleSubmit = async (values) => {
    setLoader(true)
    const newUser = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number : values.phone_number ,
      password: values.password,
      confirm_password :  values.confirm_password
    };
    const x = await  instance.post('users/register/' , newUser).then(res =>{
      if(res.status == 201){
        router.push('/login');
        toast.success('user Created')
      }
    })
    setLoader(false)
    
  };
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '', 
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().min(3, 'First name should have a minimum length of 3 characters').required('First name is required'),
      last_name: Yup.string().min(3, 'Last name should have a minimum length of 3 characters').required('Last name is required'),
      phone_number: Yup.string().required('Phone number is required'), 
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      // Handle form submission
      handleSubmit(values)
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">{t('register')}</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block mb-1">
            First name:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="w-full border rounded-md p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
              {formik.touched.first_name && formik.errors.first_name ? (
            <div className='text-[red]'>{formik.errors.first_name}</div>
             ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block mb-1">
            Last name:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="w-full border rounded-md p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
                {formik.touched.last_name && formik.errors.last_name ? (
                 <div className='text-[red]'>{formik.errors.last_name}</div>
                  ) : null}
          </div>
          <div className="mb-4">
             <label htmlFor="phone_number" className="block mb-1">
               Phone number:
             </label>
             <input
               type="text"
               id="phone_number"
               name="phone_number"
               className="w-full border rounded-md p-2"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.phone_number}
             />
             {formik.touched.phone_number && formik.errors.phone_number ? (
               <div className='text-[red]'>{formik.errors.phone_number}</div>
             ) : null}
            </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              {t('email')}:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded-md p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
                    {formik.touched.email && formik.errors.email ? (
                   <div className='text-[red]'>{formik.errors.email}</div>
                     ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              {t('password')}:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded-md p-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
                {formik.touched.password && formik.errors.password ? (
                   <div className='text-[red]'>{formik.errors.password}</div>
                     ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="confirm_password" className="block mb-1">
              confirm password:
            </label>
            <input
                    type="password"
                    id="confirm_password"  
                    name="confirm_password"  
                    className="w-full border rounded-md p-2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                />
               {formik.touched.confirm_password && formik.errors.confirm_password ? (
                   <div className='text-[red]'>{formik.errors.confirm_password}</div>
                     ) : null}
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
            {t('register')}
          </button>
          }
          <p className="mt-5">
            {t('alreadyHaveAccount')}{' '}
            <Link href={'/login'} className="text-blue-500 underline">
              {t('login')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;