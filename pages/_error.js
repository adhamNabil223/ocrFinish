// pages/_error.js
import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const ErrorPage = ({ statusCode }) => {
  const router = useRouter();

  if (statusCode === 401) {
    router.push('/login');
    toast.error('kindly login again')
    return null;
  }

  return (
    <div>
      <p>
       Something went wrong
      </p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;