import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Login from '@/pages/login';




const withAuth = (WrappedComponent) => {
  return (props) => {

    // If user is authenticated, render the protected component
    if (Cookies.get('token')) {
      return <WrappedComponent  />;
    }

    // If user is not authenticated, redirect to login or another page
    return <Login />;
  };
};

export default withAuth;