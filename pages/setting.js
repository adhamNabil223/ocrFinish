import React, { useEffect, useState } from 'react'
import { instance } from '@/components/api/config'
import withAuth from '@/components/auth/Authentication'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

export default function setting() {
  const [userData, setUserData] = useState({})
  const [loading, updateLoading] = useState(false);
  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone_number: yup
      .string()
      .min(11, 'Phone Number must be at least 11 characters')
      .max(15, 'Phone Number must be at most 15 characters')
      .required('Phone Number is required'),
  });
  const formik = useFormik({
    initialValues: {
      first_name: userData.first_name,
      last_name: userData.last_name ,
      email: userData.email ,
      phone_number: userData.phone_number,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      updateLoading(true)
      try {
        const updateData = await instance.patch(`users/${userData.id}`, values);
        toast.success('Data updated successfully')
        updateLoading(false)
      } catch (error) {
        toast.error("Somethin went wrong")
        updateLoading(false)
      }
    },
  });


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  
    formik.setValues({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
    });

  }, []);

  // const handleSubmit = (e)=>{
  //   e.preventDefault()
  //   const form = e.target.elements
  //   const updateData = instance.patch('api/users/' , {
  //       "first_name": form.first_name,
  //       "last_name": form.last_name,
  //       "email": form.email,
  //       "phone_number": form.phone_number
  //   })
  // }

  
 

  


  return (
    <>
    {
      loading && 
      <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[500] bg-[#00000061]'>
        <ClipLoader color="#3b82f6"/>
      </div>
    }
    <form onSubmit={formik.handleSubmit}>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
         First Name:
        </label>
        <input
          type="text"
          id="first_name"
          name='first_name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.first_name}
          className="w-full border rounded-md p-2"
        />
         {formik.touched.first_name && <p className='text-[red]'>{formik.errors.first_name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
        Last Name:
        </label>
        <input
          type="text"
          id="last_name"
          name='last_name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.last_name}
          className="w-full border rounded-md p-2"
        />
         {formik.touched.last_name && <p className='text-[red]'>{formik.errors.last_name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
        Email:
        </label>
        <input
          type="email"
          id="email"
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border rounded-md p-2"
        />
          {formik.touched.email && <p className='text-[red]'>{formik.errors.email}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
        Phone Number:
        </label>
        <input
          type="number"
          id="phone_number"
          name='phone_number'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone_number}
          className="w-full border rounded-md p-2"
        />
          {formik.touched.phone_number && <p className='text-[red]'>{formik.errors.phone_number}</p>}
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Update </button>
    </form>
    </>
  )
}

withAuth(setting)