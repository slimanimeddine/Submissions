import React from 'react'
import Country from './components/Country'

const Countries = ({countries}) => {
  const len = countries.length
  if (len == 0) {
    return (
      <div>{['No countries found'][0]}</div>
    )
  } else if (len > 10) {
    return (
      <div>{['Too many matches, specify another filter'][0]}</div>
    )
  } else if (len >= 1) {
    return (
      <ul>
        {countries.map(country => <Country key={+country.ccn3} country={country} />)}
      </ul>
    )  
  }
}

export default Countries