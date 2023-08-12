import { Button } from '@components';
import { useAuthContext } from '@contexts';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Routes } from '../constants';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { keycloak, kcInitialized } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!kcInitialized) return;
    if (keycloak?.authenticated) {
      router.push(Routes.HOME);
    }
  }, [router, kcInitialized, keycloak?.authenticated]);

  const login = () => {
    keycloak?.login({ idpHint: 'idir', redirectUri: location.origin + '/' });
  };

  return (
    <div className='h-full px-8 grid grid-cols-2 gap-20'>
      <div className='flex flex-col justify-center'>
        <h2 className='text-4xl'>B.C. Active Transportation</h2>
        <p>
          BCAT Description pending...
        </p>
      </div>
      <div className='flex items-center'>
        <Button variant='primary' onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
};
