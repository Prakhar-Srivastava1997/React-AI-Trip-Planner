import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../service/firebaseConfig';
import ViewTripBanner from '../viewTripBanner/viewTripBanner';
import Hotels from '../hotels/Hotels';
import Itinerary from '../itinerary/Itinerary';

const ViewTrip = () => {
    const [tripData, setTripData] = useState([]);
    //Fetchong the dynamic tripId parameter value from the URL path
    const {tripId} = useParams();

    useEffect(() => {
        tripId && getTripDatafromDB();
    }, [tripId])

    const getTripDatafromDB = async() => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists){
            console.log("trip data : ", docSnap.data());
            setTripData(docSnap.data());
        }else{
            console.log("No such data found....")
        }
    }
  return (
    <div>
      <ViewTripBanner trip={tripData}/>
      <Hotels trip={tripData}/>
      <Itinerary trip={tripData}/>
    </div>
  )
}

export default ViewTrip
