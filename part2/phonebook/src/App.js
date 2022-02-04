import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Add from './components/Add'
import Search from './components/Search'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [personsSearched, setPersonsSearched] = useState([])
  const [notifMessage, setNotifMessage] = useState('')
  const [notifClassName, setNotifClassName] = useState('')

  // get persons from the json file
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // event handler for when entering a name
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // event handler for when entering a number
  const handleNumberChange = (event) => {
    setNewNum(event.target.value)
  }

  // event handler for when searching for persons
  const handleSearchChange = (event) => {
    if(event.target.value !== '') {
      const results = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setPersonsSearched(results)  
    } else {
      setPersonsSearched([])
    }
  }
  
  // adding a persons
  const addPerson = (event) => {
    event.preventDefault()

    const personExists = (arr, obj) => {
      const found = arr.find(item => (item.name === obj.name))
      return {obj: found, exists: found !== undefined} 
    }
  
    const newObj = {
      name: newName,
      number: newNum,
      id: persons.length + 1
    }

    const returnedValue = personExists(persons, newObj)

    if(returnedValue.exists) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedValue = {...returnedValue.obj, number: newObj.number}
        personService
          .update(returnedValue.obj.id, changedValue)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedValue.obj.id ? p : returnedPerson))
            setNotifMessage(`Changed ${newObj.name}'s number`)
            setNotifClassName('success')  
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
            setTimeout(() => {
              setNotifClassName(null)
            }, 5000)
          })
          .catch(error => {
            setNotifMessage(`Information of '${returnedValue.obj.name}' has already been removed from server`)
            setNotifClassName('error')
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
            setTimeout(() => {
              setNotifClassName(null)
            }, 5000)            
          })
      }
    } else if(newObj.name === '' || newNum === '') {
      alert('Fill in the fields')
    } else {
      personService
        .create(newObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
          setNotifMessage(`Added ${newObj.name}`)
          setNotifClassName('success')
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
          setTimeout(() => {
            setNotifClassName(null)
          }, 5000)
      })
      .catch(error => {
        setNotifMessage(`${error.response.data.error.toString()}`)
        setNotifClassName('error')
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
        setTimeout(() => {
          setNotifClassName(null)
        }, 5000)      
        console.log(error.response.data.error.toString())
      })
    }
  }

  // deleting a person
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        setPersons(persons.filter(p => p.id !== id))
    } else {
      console.log('deletion cancelled')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} className={notifClassName} />
      <Search onChange={handleSearchChange} personsFilterd={personsSearched} />
      <h2>Add a new</h2>
      <Add onSubmit={addPerson} valueName={newName} valueNumber={newNum} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App