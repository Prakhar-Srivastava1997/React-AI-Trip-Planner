import React, { useState, useEffect } from 'react'
import styles from './createTrip.module.css'
import Input from '../input/input'
import { validateField } from '../../validation/promptValidation'
import { AI_PROMPT, SelectBudgetList, SelectTravellersList } from '../../constants/options'
import Card from '../card/card'
import Button from '../button/button'
import { generateAIContent } from '../../service/aiModal'
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../service/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const CreateTrip = ({ user }) => {
  const [destination, setDestination] = useState(null);
  const [promptText, setPromptText] = useState({
    totalDays: '',
    budget: '',
    travelStatus: ''
  });

  const [totalDaysError, setTotalDaysError] = useState('');

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const [tripData, setTripData] = useState(null);
  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const id = e.target.id;
    const tdRes = validateField(id, promptText.totalDays);
    if (tdRes.status) {
      setTotalDaysError('');
      setBtnDisabled(false);
    } else {
      setTotalDaysError(tdRes.errorData);
      setBtnDisabled(true);
    }
  }

  const handleCardClick = (obj) => {
    const { key, value } = obj;
    if (key === 'budget') {
      setPromptText((prev) => ({ ...prev, budget: value }));
    } else {
      setPromptText((prev) => ({ ...prev, travelStatus: value }));
    }
  }

  const handleKeyDown = (e, obj) => {
    const { key, value } = obj;
    if (e.key === 'Enter') {
      if (key === 'budget') {
        setPromptText((prev) => ({ ...prev, budget: value }));
      } else {
        setPromptText((prev) => ({ ...prev, travelStatus: value }));
      }
    }
  }

  const handleBtnClick = async () => {
    setLoader(true);
    setBtnDisabled(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{destination}', destination.label)
      .replace('{totalDays}', promptText.totalDays)
      .replace('{travelStatus}', promptText.travelStatus)
      .replace('{budget}', promptText.budget)
      .replace('{totalDays}', promptText.totalDays);

    const res = await generateAIContent(FINAL_PROMPT);
    console.log('AI response:', res);
    setLoader(false);
    setBtnDisabled(false);
    setTripData(res);
  }

  const saveTripDataToDB = async (data) => {
    //Adding new Doc inside AITrips collection
    //If there is no AITrips collection present, it will be created else doc will be added inside that collection
    //In doc()- 1)db instance 2)Collection name 3)Document name, it must be string and unique
    const docId = Date.now().toString();
    try {
      let parsed = null;
      try {
        parsed = JSON.parse(data);
      } catch (parseErr) {
        console.error('Failed to parse AI response as JSON:', parseErr);
        // store raw text under `tripDataRaw` if parsing fails
      }

      const payload = {
        userSelection: { destination: destination.label, ...promptText },
        tripData: parsed,
        userEmail: user?.email || 'guest',
        id: docId
      };

      await setDoc(doc(db, "AITrips", docId), payload);
      navigate('/view-trip/' + docId);
    } catch (err) {
      console.error('Failed to save trip to Firestore:', err);
      // surface a simple error to the user — keep UI-friendly
      alert('There was an error saving your trip. Please try again.');
    }
  }

  useEffect(() => {
    if (tripData) {
      saveTripDataToDB(tripData);
    }
  }, [tripData]);

  useEffect(() => {
    if (promptText.destination !== '' && promptText.totalDays !== ''
      && promptText.budget !== '' && promptText.travelStatus !== ''
      && totalDaysError === '') {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [promptText])

  return (
    <div className={styles.ctContainer}>
      <header className={styles.ctHeader}>
        <h2 tabIndex={'0'}>Tell us your travel preferences!</h2>
        <p tabIndex={'0'}>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      </header>

      <section className={styles.ctForm}>
        <div className={styles.ctDestination}>
          <label for="destination" tabIndex={'0'}>Provide your desired destination</label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              destination,
              onChange: (val) => { setDestination(val) },
              placeholder: 'Select Travel Destination....',
              styles: {
                container: (provided) => ({ ...provided, width: '100%' }),
                control: (provided) => ({ ...provided, background: '#fff', borderRadius: 8 }),
                input: (provided) => ({ ...provided, color: '#0e0e0eff', cursor: 'pointer' }),
                menu: (provided) => ({ ...provided, zIndex: 9999, maxHeight: 150 }),
                menuList: (provided) => ({ ...provided, maxHeight: 150, overflowY: 'auto' }),
                option: (provided, state) => ({ ...provided, background: state.isFocused ? '#eee' : '#fff' })
              },
            }}
          />
        </div>
        <div className={styles.ctDestination}>
          <label for="totalDays" tabIndex={'0'}>How many days are you planning your trip?</label>
          <Input
            id="totalDays"
            type="text"
            placeholder='Enter Days Count....'
            value={promptText.totalDays}
            onChange={(e) => setPromptText((prev) => ({ ...prev, totalDays: e.target.value }))}
            onBlur={(e) => handleOnBlur(e)}
          />
          {totalDaysError && <p style={{ color: 'red' }}>{totalDaysError}</p>}
        </div>
        <div className={styles.budget}>
          <h2 tabIndex={'0'}>What is your budget?</h2>
          <div className={styles.budgetCardContainer}>
            {SelectBudgetList.map((item) => {
              const cardObj = {
                cardHeader: { isIcon: true, value: item.icon },
                cardBody: [{ title: 'title', value: item.title }, { title: 'description', value: item.desc }]
              }
              return (
                <div key={item.id}>
                  <Card
                    cardObj={cardObj}
                    cardType={item.category === 'budget' ? 'budget' : 'travelStatus'}
                    onClick={handleCardClick}
                    selected={item.title === promptText.budget ? true : false}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.travellers}>
          <h2 tabIndex={'0'}>Who do you plan on travelling with on your next adventure?</h2>
          <div className={styles.travellerCardContainer}>
            {SelectTravellersList.map((item) => {
              const cardObj = {
                cardHeader: { isIcon: true, value: item.icon },
                cardBody: [{ title: 'title', value: item.title }, { title: 'description', value: item.desc }]
              }
              return (
                <div key={item.id}>
                  <Card
                    cardObj={cardObj}
                    cardType={item.category === 'budget' ? 'budget' : 'travelStatus'}
                    onClick={handleCardClick}
                    selected={item.title === promptText.travelStatus ? true : false}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.generateTripBtn}>
          <Button text={loader ? "Please Wait! Generating Your Trip" : "Generate Trip"} onClick={handleBtnClick} isDisabled={btnDisabled} />
        </div>
      </section>
    </div>
  )
}

export default CreateTrip
