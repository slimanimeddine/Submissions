import React from 'react'

const Person = ({ name, number, deletePerson }) => {
    return (
        <div>
            <li>{name} {number}</li>
            <button onClick={deletePerson}>delete</button>
        </div>
    )
}

const Persons = ({ persons , deletePerson }) => {
    return (
        <ul>
            {persons.map(person => <Person key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)}/>)}
        </ul>
    )
}

export default Persons