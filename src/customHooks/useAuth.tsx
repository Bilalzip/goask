'use client'
import { useEffect, useState } from 'react';
const useAuth = () => {
  const [authState, setAuthState] = useState();
  useEffect(() => {
    const token:any = localStorage.getItem('localId');
    setAuthState(token);
  }, []);

  return [authState, setAuthState];
};

export default useAuth;
