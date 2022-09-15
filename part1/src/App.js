//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { useState } from 'react'

const Header=(props)=>{
  return(
    <><h1>{props.text}</h1></>
  )
}
const StatisticLine=(props)=>{
  return(
    <><p>{props.text}: {props.value}</p></>
  )
}

const Statistics=(props)=>{
  if ((props.good+props.neutral+props.bad)===0){
    return(<><p>No feedback given</p></>)
  }else{
    return(
      <>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <p>average: {(props.good+props.bad)/3}</p>
        <p>positive: {(props.good)/(props.good+props.bad+props.neutral)*100}%</p>
      </>
    )
  }
  
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={()=> setGood(good+1)} text="good" />
      <Button handleClick={()=> setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={()=> setBad(bad+1)} text="bad" />
      <Header text="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App