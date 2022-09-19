import React from 'react';

const Header=(props) =>{
    return(
      <h1>
        {props.course}
      </h1>
    )
}
  
const Part=(props)=>{
    const part = props.part
    return(
        <>
        <li>
            {part.name} {part.exercises}
        </li>
        </>
    )
}
  
const Content=(props) =>{
    const parts = props.parts
    return(
        <div>
        <ul>
            {parts.map(part=>
            <Part key={part.id} part={part}/>
            )}
        </ul>
        </div>
        
    )
}
  
const Total = (props)=>{
    const sum = props.parts.reduce((s,p)=>
        s+p
    )
    return(
        <>
        <p>Number of exercises {sum}</p>
        </>
    )
}
  
const Course=(props)=>{
    const course = props.course
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course