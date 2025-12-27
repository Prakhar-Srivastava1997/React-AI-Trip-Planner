import React, { useEffect, useState } from 'react'
import styles from './header.module.css'
import Button from '../button/button'
import useUserProfile from '../../hooks/useUserProfile'

const HomeHeader = () => {
    const userObj = useUserProfile();
    const { isAuthenticated, loginWithRedirect, user } = userObj;
    const handleSignIn = () => {
        if (!isAuthenticated) {
            // Redirect to Auth0 and request returning to /user-profile after login
            loginWithRedirect({
                authorizationParams: {
                    redirect_uri: window.location.origin + '/user-profile'
                }
            });
        } else {
            if (user && user.name) {
                // Already logged in — navigate right away
                window.location.href = '/user-profile';
            }
        }
    }
    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoSection}>
                <img src="/mylogo.svg" alt="Logo image" />
                <h2 className={styles.logoHeading}>Xplori</h2>
            </div>
            <div className={styles.loginSection}>
                <Button text="Sign-In" onClick={handleSignIn} />
            </div>
        </div>
    )
}

const ProfileHeader = () => {
    const userObj = useUserProfile();
    const { logout } = userObj;
    const userData = localStorage.getItem('loggedInUser');
    const parsedUserData = JSON.parse(userData);
    const formatProfileName = (name) => {
        const formattedName = name?.split('@')[0]?.charAt(0)?.toUpperCase() + name?.split('@')[0]?.slice(1);
        return formattedName;
    }

    const handleSignOut = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.removeItem('loggedInUser');
    }

    const handleMyTrips = () =>{
       window.location.href = '/my-trips';
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.logoSection}>
                <img src="/mylogo.svg" alt="Logo image" />
                <h2 className={styles.logoHeading}>Xplori</h2>
            </div>
            <div className={styles.loginSection}>
                <div className={styles.loginDetail}>
                    <p className={styles.profileName}>Welcome! <span>{formatProfileName(parsedUserData?.name)}</span></p>
                    <Button text="My Trips" onClick={handleMyTrips}/>
                    <Button text="Sign Out" onClick={handleSignOut} />
                </div>
            </div>
        </div>
    )
}

const Header = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const userObj = useUserProfile();
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setIsUserLoggedIn(true);
        }
        else {
            setIsUserLoggedIn(false);
        }
    }, [userObj])

    return (
        <>
            {isUserLoggedIn ? (<ProfileHeader />) : (<HomeHeader />)}
        </>
    )
}

export default Header
