export const SelectTravellersList = [
    {
        id: 1,
        category: 'travelStatus',
        title: 'Just Me',
        desc: 'A sole traveller in exploration',
        icon: '👨🏻',
        people: '1 Person'
    },
    {
        id: 2,
        category: 'travelStatus',
        title: 'A Couple',
        desc: 'Two travellers in tandem',
        icon: '🧑🏻‍🤝‍🧑🏻',
        people: '2 People'
    },
    {
        id: 3,
        category: 'travelStatus',
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '👨🏻‍👩🏻‍👧🏻‍👦🏻',
        people: '3 or more People'
    },
    {
        id: 4,
        category: 'travelStatus',
        title: 'Friends',
        desc: 'A bunch of thrill seekers',
        icon: '🍻',
        people: '2 or more People'
    }
]

export const SelectBudgetList = [
    {
        id: 1,
        category: 'budget',
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💸',
    },
    {
        id: 2,
        category: 'budget',
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💴',
    },
    {
        id: 3,
        category: 'budget',
        title: 'Luxury',
        desc: `Don't mind the expenses`,
        icon: '💰',
    }
]

const promptSchema = `{
  "hotels": [
    {
      "name": "string",
      "address": "string",
      "price": "string",
      "imageUrl": "string",
      "latitude": number,
      "longitude": number,
      "rating": number,
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": number,
      "places": [
        {
          "name": "string",
          "details": "string",
          "imageUrl": "string",
          "latitude": number,
          "longitude": number,
          "ticketPrice": "string",
          "rating": number,
          "travelTimeMinutes": number,
          "bestTimeToVisit": "string"
        }
      ]
    }
  ]
}
Make sure the JSON is properly formatted.`

export const AI_PROMPT = `Generate Travel Plan for Location : {destination}, for {totalDays} Days for {travelStatus} with {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. Respond ONLY with valid JSON (no extra text) matching this schema:
${promptSchema}`;