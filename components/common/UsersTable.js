import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { instance } from '../api/config';

function UserTable() {
  const [certficats, setCerticats] = useState(null)

  async function getCertficatis() {
    const user = JSON.parse(localStorage.getItem('user'))
    const data = await instance.get(`documents/?uploaded_by=${user.id}`)
    setCerticats(data)
  }
  async function getCustomData(url) {
    let data = await axios.get(url, {
      headers:{
      Authorization : `Bearer ${Cookies.get('token')}`
      }
    })
    setCerticats(data)
  }
  useEffect(() => {
    getCertficatis()
  }, [])
  

  return (certficats != null) && (
    <>
    {
      certficats === "not found" ? <div className='text-center'> No Certficates Found</div> :
      <> 
       <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
          Uploaded By
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
          Orginal Certficate
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
          Orginal ID
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
           Actions
          </th>
        </tr>
      </thead>
      {
        certficats.data.results.length === 0 ? <p className='mt-10 text-center'>No Certficates Uploaded</p> : 
        certficats.data.results.map((certficate) => (
          <tr key={certficate.id}>
            {
              certficate.data !== null &&
              <>
             <td className="px-6 py-4 whitespace-nowrap">{certficate.data.id_data.first_name} {certficate.data.id_data.last_names}</td>
             <td className="px-6 py-4 whitespace-nowrap">{certficate.uploaded_by.first_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href={certficate.certificate} target='_blank'>
                  GO
              </a>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href={certficate.national_id} target='_blank'>
              GO
              </a>
            </td>

            <td className="px-6 py-4 whitespace-nowrap">
              <Link href={`/certficate/${certficate.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Check Result
              </Link>
            </td>
              </>
            }
          </tr>
        ))
      }
      <tbody className="bg-white divide-y divide-gray-200">
        
      </tbody>
    </table>
    <div className='text-center mt-10'>
    <button
    disabled={certficats.previous !== null} 
    className={`text-white ${certficats.previous !== null ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
    onClick={()=>{
      getCustomData(certficats.previous)
     }}
    >
      Pervious
    </button>
    <button
     disabled={certficats.next !== null} 
     className={`text-white ${certficats.next !== null ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} 
     onClick={()=>{
      getCustomData(certficats.next)
     }}
     >
      Next
    </button>
    </div>
      </>
    }
   
    </>
  );
}

export default UserTable;