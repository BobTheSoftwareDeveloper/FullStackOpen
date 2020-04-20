import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current" 
      + "?access_key=" + process.env.REACT_APP_API_KEY
      + "&query=" + country.capital)
      .then(response => {
        console.log("weather api called successful")
        setWeatherData(response.data.current)
      })
  }, [country])

  const [ weatherData, setWeatherData ] = useState(null)
  
  return (
    <div>
      <h1>
        {country.name}
      </h1>
      capital {country.capital} <br/>
      population {country.population}
      <h2>
        Languages
      </h2>
      <ul>
        {country.languages.map(language => 
          <li key={language.iso639_1}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt='flag' style={{width: '200px'}}></img>
      
      <Weather weatherData={weatherData} capital={country.capital} />
    </div>
  )
}

export default Country