import React, { useEffect, useState } from "react";
import { SelectTravellersList } from "../../../constants/options";
import styles from './viewTripBanner.module.css';
import { getPlaceDetailsFromAPI } from "../../../service/globalAPI";
import { PHOTO_REF_URL } from "../../../service/globalAPI";

const ViewTripBanner = ({ trip }) => {

  const [photoUrl, setPhotoUrl] = useState();

  const formatTotalDays = (value) => {
    const formattedTD = parseInt(value) > 1 ? `${value} Days` : `${value} Day`;
    return formattedTD;
  }
  const getNoOfTravellers = (travelStatus) => {
    let noOfTravelers = "";
    SelectTravellersList.forEach((item) => {
      if (item.title === travelStatus) {
        noOfTravelers = item.people;
      }
    })
    return noOfTravelers;
  }

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip])

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination
    }
    const result = await getPlaceDetailsFromAPI(data).then(res => {
      if (res.data.places[0].photos && res.data.places[0].photos.length > 0) {
        const { name, heightPx, widthPx } = res.data.places[0].photos[1];
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const photoUrl = `${PHOTO_REF_URL}/${name}/media?maxHeightPx=${heightPx}&maxWidthPx=${widthPx}&key=${apiKey}`;
        setPhotoUrl(photoUrl);
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgSec}>
        <img src={photoUrl} alt="image" />
      </div>
      <div className={styles.tripDetailsContainer}>
        <h2 className={styles.header} tabIndex={'0'}>{trip?.userSelection?.destination}</h2>
        <div className={styles.tripDetails}>
          <p tabIndex={'0'}>{formatTotalDays(trip?.userSelection?.totalDays)}</p>
          <p tabIndex={'0'}>{trip?.userSelection?.budget} Budget</p>
          <p tabIndex={'0'}>No. of Travellers: {getNoOfTravellers(trip?.userSelection?.travelStatus)}</p>
        </div>
      </div>
    </div>
  )
}

export default ViewTripBanner
