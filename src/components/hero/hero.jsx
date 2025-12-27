import React, { useEffect } from 'react'
import styles from './hero.module.css'
import Button from '../button/button'
import { useNavigate } from 'react-router-dom';
import useUserProfile from '../../hooks/useUserProfile';

const Hero = () => {
  const { loginWithRedirect, isAuthenticated, user } = useUserProfile();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      // Redirect to Auth0 and request returning to /user-profile after login
      loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin + '/user-profile'
        }
      });
    } else {
      // Already logged in — navigate right away
      navigate('/user-profile');
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      navigate('/user-profile');
    }
  }, [])
  
  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.heroTitle} tabIndex={'0'}>
        <span className={styles.heroTitleSpan}>Discover Your Next Adventure with AI:</span><br />
        Personalized Travel Itineraries at Your Fingertips
      </h1>
      <div className={styles.getStartedSection}>
        <p tabIndex={'0'}>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget</p>
        <Button text="Get Started, It's free" onClick={handleClick} />
      </div>
      <div className={styles.aboutSection}>
        <h1 className={styles.aboutTitle} tabIndex={'0'}>About Us</h1>
        <div className={styles.aboutDesc}>
          <div className={styles.para} tabIndex={'0'}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum
            </p>
          </div>
          <div className={styles.aboutImg}>
            <img src="/about.jpg" alt='About image' width={'100%'} height={'100%'} />
          </div>
        </div>
      </div>
      <div className={styles.contactSection}>
        <h1 className={styles.contactTitle} tabIndex={'0'}>Reach Out To Us</h1>
        <p className={styles.contactPara} tabIndex={'0'}>Any query? Please reach out to us by below means, we are 24X7 available to assist you!</p>
        <div className={styles.contactDetails}>
          <div className={styles.image}>
            <img src="/contact-us.jpg" alt='Contact Image' width={'100%'} height={'100%'} />
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.details}>
              <div className={styles.phone}>
                <img src="/phone.png" alt='Phone' width={'100%'} height={'100%'} />
                <p tabIndex={'0'}>+91 1234567899</p>
              </div>
              <div className={styles.email}>
                <img src="/email.png" alt='Phone' width={'100%'} height={'100%'} />
                <p tabIndex={'0'}>abc.xyz@gmail.com</p>
              </div>
              <div className={styles.address}>
                <img src="/location.png" alt='Phone' width={'100%'} height={'100%'} />
                <p tabIndex={'0'}>135, Patel Road, Ram Nagar, Bengaluru, Karnataka - 123456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
