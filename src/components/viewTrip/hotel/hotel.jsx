import React, { useEffect, useState } from 'react'
import Card from '../../card/card'
import { getPlaceDetailsFromAPI, PHOTO_REF_URL } from '../../../service/globalAPI';

const Hotel = ({ hotel }) => {
    const [hotelObj, setHotelObj] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelPrice: '',
        hotelRating: '',
        hotelImage: ''
    });
    useEffect(() => {
        Object.keys(hotel).forEach((key) => {
            if (String(key).toLocaleLowerCase().includes('name'.toLowerCase())) {
                setHotelObj((prev) => ({ ...prev, hotelName: hotel[key] }));
                getHotelPhoto(hotel[key]);
            }
            if (String(key).toLocaleLowerCase().includes('address'.toLowerCase())) {
                setHotelObj((prev) => ({ ...prev, hotelAddress: hotel[key] }));
            }
            if (String(key).toLocaleLowerCase().includes('price'.toLowerCase())) {
                setHotelObj((prev) => ({ ...prev, hotelPrice: hotel[key] }));
            }
            if (String(key).toLocaleLowerCase().includes('rating'.toLowerCase())) {
                setHotelObj((prev) => ({ ...prev, hotelRating: hotel[key] }));
            }
        })
    }, [hotel])

    const handleCardClick = (name, address) => {
        // Open Google Maps search for the provided address in a new tab
        if (!address) return;
        const query = `${name} ${address}`;
        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        window.open(url, '_blank');
    }

    const handleKeyDown = (e, name, address) => {
        if (e.key === 'Enter') {
            handleCardClick(name, address);
        }
    }

    const getHotelPhoto = async (hotelName) => {
        const data = {
            textQuery: hotelName
        }
        await getPlaceDetailsFromAPI(data).then(res => {
            if (res.data.places[0].photos && res.data.places[0].photos.length > 0) {
                const { name, heightPx, widthPx } = res.data.places[0].photos[1];
                const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
                const photoUrl = `${PHOTO_REF_URL}/${name}/media?maxHeightPx=${heightPx}&maxWidthPx=${widthPx}&key=${apiKey}`;
                setHotelObj((prev) => ({ ...prev, hotelImage: photoUrl }));
            }
        })
    }

    const cardObj = {
        cardHeader: { isIcon: false, value: hotelObj.hotelImage },
        cardBody: [
            { title: 'title', value: hotelObj.hotelName },
            { title: 'address', value: hotelObj.hotelAddress },
            { title: 'price', value: hotelObj.hotelPrice },
            { title: 'rating', value: hotelObj.hotelRating }
        ]
    }
    return (
        <Card
            cardObj={cardObj}
            onClick={() => handleCardClick(hotelObj.hotelName, hotelObj.hotelAddress)}
            onKeyDown={(e) => handleKeyDown(e, hotelObj.hotelName, hotelObj.hotelAddress)}      
        />
    )
}

export default Hotel
