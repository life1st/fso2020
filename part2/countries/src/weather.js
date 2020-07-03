import React, { useState, useEffect } from 'react'
import axios from 'axios'
const fetchWeather = (name) => {
  const key = process.env.REACT_APP_WEATHER_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${encodeURIComponent(name)}`

  return axios.get(url)
}

const Weather = ({
  cityname
}) => {
  let [ w, setWeather ] = useState({})
  
  useEffect(() => {
    fetchWeather(cityname).then(res => {
      console.log(res)
      if (res.status === 200) {
        setWeather(res.data.current)
      }
    })
  }, [cityname])
  if (Object.keys(w).length === 0) {
    return null
  }
  return (
    <div>
      <h3>Weather in {cityname}</h3>
      <p>temperature: {w.temperature} celcius</p>
      {
        w.weather_icons.length > 0 && (
          <img src={w.weather_icons[0]} alt="icon" style={{width: 60}}/>
        )
      }
      <p>wind: {w.wind_speed}mph / {w.wind_dir} / {w.wind_degree}deg</p>
    </div>
  )
}

export { Weather }
