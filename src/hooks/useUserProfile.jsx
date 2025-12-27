import React, { useEffect, useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const useUserProfile = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    }
  }, [isAuthenticated, user])
  const authData = useMemo(() => {
    const storeObj = {
      user,
      isAuthenticated,
      loginWithRedirect,
      logout
    }
    return storeObj;
  }, [user])
  return authData;
}

export default useUserProfile;
