import React from 'react'

const SearchForCountries = ({onChange, countries}) => {
    return (
      <div>
        <div>
          find countries
          <input onChange={onChange} />
        </div>
        <div>
          <Countries countries={countries} />
        </div>
      </div>
    )
}

export default SearchForCountries