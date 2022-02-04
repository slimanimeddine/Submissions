import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForCountries from './components/SearchForCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(error.response)
      })
  }, [])

  const handleSearchChange = (event) => {
    const searchResults = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setSearchedCountries(searchResults)
  }

  return (
    <div>
      <SearchForCountries onChange={handleSearchChange} countries={searchedCountries} />
    </div>
  )
}

export default App