import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = ({country}) => {
    const [showView, setShowView] = useState(false)
    const [currentWeather, setCurrentWeather] = useState({})
    
    const api_key = process.env.REACT_APP_API_KEY
  
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
        .then(response => {
          setCurrentWeather({
            temp: response.data.main.temp,
            wind: response.data.wind.speed,
            windDir: response.data.wind.deg,
            img: response.data.weather.icon
          })
        })
        .catch(error => {
          console.log(error.response)
        })
    })
  
    const view = showView 
      ? <li>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>population {country.population}</div>
      <div>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((l, i) => (<li key={i}>{l}</li>))}
        </ul>
      </div>
      <div>
        <img src={Object.values(country.flags)[0]}/>
      </div>
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <div><strong>temperature: </strong> {currentWeather.temp} Celcius</div>
        <div><img src={currentWeather.img} /></div>
        <div><strong>wind: </strong> {currentWeather.wind} mph direction {currentWeather.windDir} </div>
      </div>
      <button onClick={() => setShowView(!showView)}>{showView ? 'hide' : 'show'}</button>
    </li>
    : <li>
      <h1>{country.name.common}</h1>
      <button onClick={() => setShowView(!showView)}>{showView ? 'hide' : 'show'}</button>
    </li>
  
    return (
      view
    )
}
  
export default ShowCountry