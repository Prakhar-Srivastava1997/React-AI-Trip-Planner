import React, { useEffect, useState } from 'react'
import CreateTrip from '../createTrip/createTrip.jsx'
import useUserProfile from '../../hooks/useUserProfile.jsx';

const UserProfile = () => {
  const [userData, setUserData] = useState();
  let userInfo = useUserProfile();
  useEffect(() => {
    if (userInfo && userInfo.user) {
      setUserData(userInfo.user);
    }else if(localStorage.getItem('loggedInUser')) {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      setUserData(storedUser);
    }
    else{
      console.log("User data is not available yet.");
    }
  }, [userInfo])

  return (
    <CreateTrip user={userData} />
  )
}

export default UserProfile
