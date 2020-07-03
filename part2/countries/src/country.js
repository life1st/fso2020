import React, { useState } from 'react'
import { Weather } from './weather'

const Country = ({country}) => {
  let c = country
  return (
    <div>
      <h2>{c.name}</h2>
      <p>capital: {c.capital}</p>
      <p>population: {c.population}</p>
      <h3>languages</h3>
      <ul>
        {c.languages.map(l => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <img src={c.flag} alt="flag" style={{width: 100}}/>
    </div>
  )
}

const CountryList = ({countries}) => {
  const [ country, setCountry ] = useState({})

  const showCountry = (c) => {
    if (c.name === country.name) {
      setCountry({})
    } else {
      setCountry(c)
    }
  }
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify anothor filter.</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        <ul>
          {countries.map(c => (
            <li key={c.name}>
              {c.name} <button onClick={() => showCountry(c)}>show</button>
            </li>
          ))}
        </ul>
        {Object.keys(country).length > 0 ? <Country country={country} /> : null}
      </div>
    ) 
  } else if (countries.length === 1) {
    let c = countries[0]
    return (
      <div>
        <Country country={c}/>
        <Weather cityname={c.capital}/>
      </div>
    )
  } else {
    return <div>null.</div>
  }
}

export { Country, CountryList }