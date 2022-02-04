import React from 'react'
import Persons from './Persons'

const Search = ({ onChange, personsFilterd }) => {
    return (
      <div>
        filter shown with
        <input
          onChange={onChange}
        />
        <Persons persons={personsFilterd} />
      </div>
    )
}

export default Search