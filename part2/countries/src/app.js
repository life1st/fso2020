import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CountryList } from './country'

const fetchCounties = () => {
  return axios.get('https://restcountries.eu/rest/v2/all')
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchingText, setSearchingText ] = useState('')
  
  const handleSearchingInput = (e) => {
    setSearchingText(e.target.value)
  }

  useEffect(() => {
    fetchCounties().then(res => {
      if (res.status === 200) {
        setCountries(res.data)
      }
    })
  }, [])

  const showCountries = countries.filter(c => c.name.toLowerCase().includes(searchingText))
  console.log(showCountries)
  return (
    <div>
      <p>find Countries: <input type="text" value={searchingText} onChange={handleSearchingInput}/></p>
      <div>
        <CountryList countries={showCountries}/>
      </div>
    </div>
  )
}

export { App }
