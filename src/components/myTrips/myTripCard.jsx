import React, { useEffect, useState } from 'react'
import { getPlaceDetailsFromAPI, PHOTO_REF_URL } from '../../service/globalAPI';
import Card from '../card/card';

const MyTripCard = ({ trip }) => {
    const [tripDetails, setTripDetails] = useState({
        destinationImg: '',
        destinationName: '',
        tripAgenda: {
            noOfDays: '',
            budget: ''
        }
    })
    const { userSelection } = trip;
    useEffect(() => {
        Object.keys(userSelection).forEach((key) => {
            switch (key) {
                case 'destination':
                    setTripDetails((prev) => ({ ...prev, destinationName: userSelection[key] }));
                    getPlacePhoto(userSelection[key]);
                    break;
                case 'totalDays':
                    setTripDetails((prev) => ({ ...prev, tripAgenda: { ...prev.tripAgenda, noOfDays: userSelection[key] } }));
                    break;
                case 'budget':
                    setTripDetails((prev) => ({ ...prev, tripAgenda: { ...prev.tripAgenda, budget: userSelection[key] } }));
                    break;
                default:
                    break;
            }
        })
    }, [trip])

    const getPlacePhoto = async (placeName) => {
        const data = {
            textQuery: placeName
        }
        const result = await getPlaceDetailsFromAPI(data).then(res => {
            if (res.data.places[0].photos && res.data.places[0].photos.length > 0) {
                const { name, heightPx, widthPx } = res.data.places[0].photos[1];
                const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
                const photoUrl = `${PHOTO_REF_URL}/${name}/media?maxHeightPx=${heightPx}&maxWidthPx=${widthPx}&key=${apiKey}`;
                setTripDetails((prev) => ({ ...prev, destinationImg: photoUrl }));
            }
        })
    }

    const getTripAgenda = (days, budget) => {
        if(!days || !budget) return '';
        const summary = days > 1 ? `${days} days trip` : `${days} day trip`;
        return `${summary} with ${budget} budget`;
    }

    const cardObj = {
        cardHeader: { isIcon: false, value: tripDetails.destinationImg },
        cardBody: [
            { title: 'title', value: tripDetails.destinationName },
            { title: 'tripAgenda', value: getTripAgenda(tripDetails.tripAgenda.noOfDays, tripDetails.tripAgenda.budget)}
        ]
    };

    const handleCardClick = () => {
        window.location.href = `/view-trip/${trip?.id}`;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCardClick();
        }
    }

    return (
        <Card
            cardObj={cardObj}
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
        />
    )
}

export default MyTripCard
