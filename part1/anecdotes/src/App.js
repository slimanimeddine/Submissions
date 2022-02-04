import React, { useState } from 'react'

const Title = (props) => <h1> {props.text} </h1>

const Display = (props) => {
  return (
    <div>
      <p>{props.arr[props.index]}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick} > {props.text} </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const copy = [...points]

  const getNextAnecdoteRandomly = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteAnecdote = () => {
    copy[selected] += 1
    setPoints(Array.from(copy))
  }

  const maxPoints = () => points.indexOf(Math.max(...points))

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Display arr={anecdotes} index={selected} votes={points[selected]} />
      <Button onClick={getNextAnecdoteRandomly} text="next anecdote" />
      <Button onClick={voteAnecdote} text="vote" />
      <Title text="Anecdote with most votes" />
      <Display arr={anecdotes} index={maxPoints()} votes={points[maxPoints()]} />
    </div>
  )
}

export default App