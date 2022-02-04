import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const {parts} = course
    const sum = parts.reduce((s, p) => s += p.exercises, 0)
    return(
      <p>Total of {sum} exercises</p>
    ) 
  }
  
  const Part = ({ part }) => {
    const {name, exercises} = part
    return (
      <li>{name} {exercises}</li>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <ul>
        {course.parts.map(part => <Part key={part.id} part={part} />)}
      </ul>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <li>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </li>
    )
  }  

export default Course;