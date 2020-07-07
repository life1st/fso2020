import React, { useState, useEffect, useRef } from 'react';
import { Banner } from './components/Banner'
import { fetchAll, AddPerson, deletePersonById, editPersonPhoneNumber } from './request'
const App = () => {
  const [ banner, setBannerInfo ] = useState({})
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchingName, setSearchingName ] = useState('')
  const nameInputerRef = useRef()

  useEffect(() => {
    fetchAll()
    .then(res => {
      const persons = res.data
      setPersons(persons)
    })
  }, [])

  const updateBanner = (msg, type='normal', time=1800) => {
    setBannerInfo({type, message: msg})
    setTimeout(() => {
      setBannerInfo({})
    }, time);
  }
  const setInputDefualtStat = () => {
    setNewName('')
    setNewNumber('')
    nameInputerRef.current.focus()
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchingChange = (e) => {
    setSearchingName(e.target.value)
  }
  const handleDeletePerson = (person) => {
    const { id, name } = person
    if (window.confirm(`delete ${name} from your phonebook?`)) {
      deletePersonById(id).then(() => {
        updateBanner(`delete ${name} success!`)
      }).catch(e => {
        updateBanner(`${name} perhaps already removed.`, 'error', 3000)
      }).finally(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  const handleFromSubmit = (e) => {
    e.preventDefault()
    if (newName === '') return
    const info = {name: newName, number: newNumber}
    let existPerson = persons.find((p) => p.name === newName)
    if (existPerson) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to replace number?`)) {
        const {id} = existPerson
        editPersonPhoneNumber(id, info).then(res => {
          updateBanner(`update ${newName} info success!`)
          setPersons(persons.map(p => {
            if (p.name === newName) {
              return {...p, number: newNumber}
            } else {
              return p
            }
          }))
          setInputDefualtStat()
        }).catch(e => {
          updateBanner(e.response.data, 'error')
        })
      }
      return
    }
    
    AddPerson(info).then(() => {
      updateBanner(`add ${newName} success!`)
      setInputDefualtStat()
      setPersons([
        ...persons,
        info
      ])
    }).catch(e => {
      updateBanner(e.response.data, 'error')
    })
  }

  const showPersons = persons.filter(({name}) => {
    return name.toLowerCase().indexOf(searchingName) > -1
  })
  return (
    <div>
      <h2>Phonebook</h2>
      <div style={{display: 'absolute'}}>
        <Banner 
          type={banner.type} 
          message={banner.message} 
        />
      </div>
      <div>
        <p>
          Filter show with
          <input value={searchingName} onChange={handleSearchingChange}/>
        </p>
      </div>
      <form onSubmit={handleFromSubmit}>
        <h3>Add a new</h3>
        <div>
          name: <input ref={nameInputerRef} value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showPersons.map((p) => {
        const { name, number } = p
        return (<p key={name}>{name} {number} <button onClick={() => handleDeletePerson(p)}>delete</button></p>)
      })}
    </div>
  )
}

export default App
