import axios from "axios"

const BASE_URL="https://places.googleapis.com/v1/places:searchText"

//Google place API configuration
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_API_KEY,
        //Specify the list of fields to return in the response, we need fieldmask
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const getPlaceDetailsFromAPI = (data) => axios.post(BASE_URL, data, config);

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1';