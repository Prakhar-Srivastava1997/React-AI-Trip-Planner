import React, { useEffect, useState } from 'react'
import Card from '../../card/card';
import { getPlaceDetailsFromAPI, PHOTO_REF_URL } from '../../../service/globalAPI';

const PlaceCard = ({ place }) => {
  const [placeObj, setPlaceObj] = useState({
    placeTitle: '',
    placeDescription: '',
    placeVisitTime: '',
    placeTravelTime: '',
    placeImage: ''
  });

  const formatTimeToVisit = (data) => {
    const startIndex = data?.indexOf('(');
    const endIndex = data?.indexOf(')');
    const formattedTime = data?.slice(startIndex + 1, endIndex);
    return formattedTime;
  }

  useEffect(() => {
    Object.keys(place).forEach((key) => {
      if (String(key).toLocaleLowerCase().includes('name'.toLowerCase())) {
        setPlaceObj((prev) => ({ ...prev, placeTitle: place[key] }));
        getPlacePhoto(place[key]);
      }
      if (String(key).toLocaleLowerCase().includes('visit'.toLowerCase())) {
        const formatVisitTime = formatTimeToVisit(place[key]);
        setPlaceObj((prev) => ({ ...prev, placeVisitTime: formatVisitTime }));
      }
      if (String(key).toLocaleLowerCase().includes('details'.toLowerCase()) ||
        String(key).toLocaleLowerCase().includes('description'.toLowerCase())) {
        setPlaceObj((prev) => ({ ...prev, placeDescription: place[key] }));
      }
      if (String(key).toLocaleLowerCase().includes('travel'.toLowerCase())) {
        setPlaceObj((prev) => ({ ...prev, placeTravelTime: place[key] }));
      }
    })
  }, [place])

  const cardObj = {
    cardHeader: { isIcon: false, value: placeObj.placeImage },
    cardBody: [
      { title: 'title', value: placeObj.placeTitle },
      { title: 'time', value: placeObj.placeVisitTime },
      { title: 'description', value: placeObj.placeDescription },
      { title: 'travelTime', value: placeObj.placeTravelTime }
    ]
  };

  const handleCardClick = (placeName) => {
    // Open Google Maps search for the provided place name in a new tab
    if (!placeName) return;
    const query = `${placeName}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  }

  const handleKeyDown = (e, placeName) => {
    if (e.key === 'Enter') {
      handleCardClick(placeName);
    }
  }

  const getPlacePhoto = async (placeName) => {
    const data = {
      textQuery: placeName
    }
    await getPlaceDetailsFromAPI(data).then(res => {
      if (res.data.places[0].photos && res.data.places[0].photos.length > 0) {
        const { name, heightPx, widthPx } = res.data.places[0].photos[1];
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const photoUrl = `${PHOTO_REF_URL}/${name}/media?maxHeightPx=${heightPx}&maxWidthPx=${widthPx}&key=${apiKey}`;
        setPlaceObj((prev) => ({ ...prev, placeImage: photoUrl }));
      }
    })
  }

  return (
    <Card
      cardObj={cardObj}
      onClick={() => handleCardClick(placeObj.placeTitle)}
      cardStructure='landscape'
      onKeyDown={(e) => handleKeyDown(e, placeObj.placeTitle)}
    />
  )
}

export default PlaceCard
