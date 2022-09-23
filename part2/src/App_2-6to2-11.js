import React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios'

const Filter=(props)=>{

  return(
    <p>Filter shown with: <input onChange={props.handleChange} /></p>
  )
}

const PersonForm = (props)=>{
  let addNewPerson = props.handleSubmit
  let newPerson=props.newPerson
  let handlePersonChange=props.handleInputChange

  return(
    <form onSubmit={addNewPerson}>
        <div>
          <p>name: <input value={newPerson.name} onChange={handlePersonChange} name='name' /></p>
          <p>number: <input value={newPerson.number} onChange={handlePersonChange} name='number' /></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons= (props) =>{
  let filteredList = props.list
  return(
    <ul>
      {filteredList.map((person,i)=>
        <li key={i}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState([{name:'',number:''}])
  const [filteredList,setFilteredList]=useState(persons)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setPersons(response.data)
        setFilteredList(response.data)
      })
  }, [])
  
  const handleListChange=(event)=>{
    const query = event.target.value;
    if(query.length>0){
      let updatedList = [...persons];
      updatedList=updatedList.filter((person) => person.name.indexOf(query) !== -1)
      setFilteredList(updatedList)
    }else{
      setFilteredList(persons)
    }
    
  }
  
  const handlePersonChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  }

  function addNewPerson(event) {
    event.preventDefault();
    const personObject = {
      name: newPerson.name,
      number: newPerson.number
    };

    let checkName = persons.some(e => e.name === newPerson.name);
    let checkNumber = persons.some(e => e.number === newPerson.number);

    if (checkNumber || checkName) {
      alert(newPerson.name + ' is already added to the phonebook');
      setNewPerson([{ name: '', number: '' }]);
      event.target.reset();
    } else {
      let updatedList = [...persons];
      setPersons(updatedList.concat(personObject));
      setFilteredList(updatedList.concat(personObject))
      setNewPerson([{ name: '', number: '' }]);
      event.target.reset();
    }
  }

  return (
    <><div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleListChange}/>
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addNewPerson}
        newPerson={newPerson}
        handleInputChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <Persons list={filteredList} />
    </div>
    </>
  )
}

export default App