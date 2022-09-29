import React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios'

const CountryShow= (props)=>{
  let country = props.country
  let show = props.show
  let capital = country.capital
  let lat = country.capitalInfo.latlng[0]
  let lon = country.capitalInfo.latlng[1]
  console.log(lat,lon)
  let api = props.api
  const hook = () => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+api+'&units=metric')
      .then(response => {
        capital['temp']=response.data.main.temp
        capital['wind']=response.data.wind.speed
        capital['icon']="http://openweathermap.org/img/w/"+response.data.weather[0].icon+".png"
      })
  }
  
  useEffect(hook, [])
  console.log(capital)
    if(show){
    return(
      <><h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.keys(country.languages).map(key =>{
            return(
              <li key={key}>{country.languages[key]}</li>
            )
          })}
        </ul>
        <img src={country.flags.png} alt={country.name}/>
        <h1>Weather in {country.capital[0]}</h1>
        <p>temperature: {capital.temp} Ceslsius </p>
        <div><img src={capital.icon} id="icon"/></div>
        <p>Wind: {capital.wind} m/s </p>
        </>
    )
    }else{
      return(
        <>{country.name.common} {country.show}</>
      )
    }
}


const App = () => {

  const [countries,setCountries]=useState([])
  const [filteredList,setFilteredList]=useState(countries)
  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key)

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response['data'])
      })
  }
  
  useEffect(hook, [])

  const handleCountryChange=(event)=>{
    const query = event.target.value;
    if(query.length>0){
      let updatedList = [...countries];
      updatedList=updatedList.filter((country) => country.name.common.indexOf(query) !== -1)
      updatedList.map(country=>{
        return(
          country.show=false
        )
      })
      setFilteredList(updatedList)
    }else{
      setFilteredList(countries)
    }
    
  }

  function handleCountryShow(List,element){
    const copy=[
      ...List
    ]
    copy[element].show=!copy[element].show
    setFilteredList(copy)
    console.log(copy)
  }
  if (filteredList['data']!==undefined){
    filteredList=filteredList['data']
  }



  if (filteredList.length===1){
    let country=filteredList[0]
    country.show=true
    return(
      <><p>
        Find countries:
        <input type="text" onChange={handleCountryChange}></input>
      </p><CountryShow country={country} show={country.show} api={api_key} /></>
    )
  }else if(filteredList.length>1 && filteredList.length<=10){
    return(
      <><p>
        Find countries: 
        <input type="text" onChange={handleCountryChange}></input>
      </p>
      <ul>
        {filteredList.map((country, i) => 
        <><li key={i}>
        <button onClick={() => handleCountryShow(filteredList,i)}>{country.show ?'Hide':'Show'} {country.name.common}</button>
        <CountryShow country={country} show={country.show} api={api_key} /></li></>)}
      </ul></>
    )
  }else{
    return(
      <><p>
        Find countries:
        <input type="text" onChange={handleCountryChange}></input>
      </p><p>Too many matches, specify another filter</p></>
    )
  }
}

export default App