import React, { useState, useEffect } from 'react';
import { fetchAll, AddPerson } from './request'
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchingName, setSearchingName ] = useState('')

  useEffect(() => {
    fetchAll()
    .then(res => {
      const persons = res.data
      setPersons(persons)
    })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchingChange = (e) => {
    setSearchingName(e.target.value)
  }
  const handleFromSubmit = (e) => {
    e.preventDefault()
    if (newName === '') return
    if (persons.some(({name}) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const info = {name: newName, number: newNumber}
    setPersons([
      ...persons,
      info
    ])
    AddPerson(info).then(() => {
      setNewName('')
      setNewNumber('')
    })
  }

  const showPersons = persons.filter(({name}) => {
    return name.toLowerCase().indexOf(searchingName) > -1
  })
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>
          Filter show with
          <input value={searchingName} onChange={handleSearchingChange}/>
        </p>
      </div>
      <form onSubmit={handleFromSubmit}>
        <h3>Add a new</h3>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons.map(({name, number}) => (
        <p key={name}>{name} {number}</p>
      ))}
    </div>
  )
}

export default App
