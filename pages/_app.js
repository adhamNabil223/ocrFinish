import Navbar from '@/components/auth/Navbar';
import '@/styles/globals.css'
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {AiFillHome , AiFillSetting  , AiOutlineMenu} from 'react-icons/ai'
import {BiSolidCloudUpload , BiLogOut} from 'react-icons/bi'
import { RiLockPasswordLine } from "react-icons/ri";
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { instance } from '@/components/api/config';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["htmlTag", "cookie", "subdomain", "localStorage", "path"],
      caches: ["cookie"],
    },

    backend: {
      loadPath: "localiz/{{lng}}/translation.json",
    },

    react: { useSuspense: false },

    interpolation: {
      escapeValue: false, 
    },
  });

export default function App({ Component, pageProps }) {
  const [open, setOpen] = useState(true);
  const [load, setLoad] = useState(false);
  const Menus = [
    { title: "Dashboard", src: AiFillHome , to: "/" },
    { title: "Upload", src: BiSolidCloudUpload , to: "/upload" },
    { title: "Setting", src: AiFillSetting, gap: true , to: "/setting" },
    { title: "Change Password", src: RiLockPasswordLine, gap: true , to: "/changePw" },
    { title: "Sign Out ", src: BiLogOut , to: "/" },
  ];
  const router = useRouter()  
  function signMeOut() {
  Cookies.remove('token')
  localStorage.clear()
  router.push('/')
  }

  var userData = typeof window !== "undefined" ? localStorage.getItem('user') : null
  var parseData = JSON.parse(userData)

  useEffect(() => {
    setLoad(true)
    const handleWindowResize = () => {
        const windowWidth = window.innerWidth;
        const menu = document.getElementById('menu')
        if (windowWidth >= 750) {
            setOpen(false); 
            const menu = document.getElementById('menu')
            menu.style.display = 'block'
        }else{
          menu.style.display = 'none'
        }
    };
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize);
   
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
}, []);

  


  return(
    <div className="flex" id='main'>
      <I18nextProvider i18n={i18n}>
      <div>
      <ToastContainer />
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-[#243e56] h-[100%]  p-5  pt-8 relative duration-300
      ${!Cookies.get('token') || router.pathname.includes('certficate') ? "hidden" : ""}
      `}
    >
      <AiOutlineMenu 
       className={`absolute cursor-pointer right-50 top-3 w-7  ${!open ? "rotate-180" : "!right-1"}`} 
       onClick={() => setOpen(!open)}  size={50}
       color='grey'
       id='menu'
      />

      <ul className="pt-6">
        <li>
          
        </li>
        {Menus.map((Menu, index) => (
          <li
            key={index}
            onClick={
             ()=>{
              Menu.src == BiLogOut ? signMeOut() : ''}
            }
          >
            <Link href={Menu.to}
             className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
             ${Menu.gap ? "mt-9" : "mt-2"} `}
            >
            <Menu.src size={20}/>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
    <div className="flex-1">
      {
        Cookies.get('token') ?  <Navbar userName={parseData.first_name} onSignOut={signMeOut}/> : ''
      }
   
    <div className='p-7 h-screen'>
    <Component {...pageProps} />
    </div>
    </div>
    </I18nextProvider>
  </div>
  )
}
