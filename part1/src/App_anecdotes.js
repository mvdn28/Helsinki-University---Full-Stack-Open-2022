//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Votes=(props)=>(
  <>
    <p>has {props.voted} votes</p>
  </>
)

const MostVoted=(props)=>{
  let arr=Object.values(props.vote)
  let max=Math.max(...arr)
  let Key=Object.keys(props.vote).find(key => props.vote[key] === max)
  return(
    <>
      <p>{props.anecdotes[Key]}</p>
      <p>has {max} votes</p>
    </>
  )  
}


const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
    
  const [selected, setSelected] = useState(0)
  const [vote, setVoted] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0})
  const handleVoteButton=(anec)=>{
    const copy={
      ...vote
    }
    copy[anec]+=1
    setVoted(copy)
  }
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Votes voted={vote[selected]} />
      <Button handleClick={()=> handleVoteButton(selected)} text="vote" />
      <Button handleClick={()=> setSelected(getRandomInt(0,6))} text="next anecdote" />
      <h1>Anecdote of the day</h1>
      <MostVoted vote={vote} anecdotes={anecdotes}/>
    </div>
  )
}

export default App