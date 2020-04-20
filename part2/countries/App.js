import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Components/Country'

const App = () => {
  const [ searchText, setSearchText ] = useState('')
  const [ countryList, setCountryList ] = useState([])
  const [ selectedCountry, setSelectedCountry ] = useState(null)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        const countries = response.data
        for (var i = 0; i < countries.length; i++) {
          countries[i]['index'] = i
        }
        setCountryList(countries)
        console.log("promise fulfilled")
      })
  }, [])

  const handleFilterTextChange = (event) => {
    setSearchText(event.target.value)
    setSelectedCountry(null)
  }

  const handleButtonClick = (country) => { 
    setSelectedCountry(country)
    console.log("show clicked", country)
  }
  
  const filteredList = 
    searchText === ""
      ? countryList
      : countryList.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase()))

  let content = <div>Enter country name to filter the list of countries.</div>
  if (searchText === "") {
    // no search text yet
  } else if (selectedCountry) {
    content = <Country country={selectedCountry} />
  } else if (filteredList.length > 10) {
    // too big of a search result (more than 10)
    content = 
      <div>
        Too many matches, specify another filter.
      </div>
  } else if (filteredList.length === 1) {
    // narrowed down to just one country
    const country = filteredList[0]
    content = <Country country={country} />
  } else if (filteredList.length === 0) {
    // no country with the search text
    content = 
      <div>
        No countries found. Try again. 
      </div>
  } else {
    // search text given, search result is 10 or under and not 1
    content = 
      <div id="countryList">
        {filteredList.map(country => 
          <div key={country.callingCodes} style={{ margin: '10px 0'}}>
            <span >{country.name}</span>
            <button onClick={() => handleButtonClick(country)} value={country.index}> show</button>
          </div>
        )}
      </div>
  }

  return (
    <div>
      find countries <input onChange={handleFilterTextChange} value={searchText} />
      { content }
    </div>
  )
}

export default App