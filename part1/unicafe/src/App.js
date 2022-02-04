import React, { useState } from 'react'

const Title = (props) => <h1> {props.text} </h1> 

const Button = (props) => <button onClick={props.click}> {props.text} </button>

const StatisticLine = (props) => {
  return (
    <tr>
      <th> {props.text} </th>
      <td> {props.value} </td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.good > 0 || props.neutral > 0 || props.bad > 0) {
    return (
      <div>
        <Title text="statistics" />
        <table>
          <thead></thead>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
            <StatisticLine text="average" value={((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / (props.good + props.neutral + props.bad)} />
            <StatisticLine text="positive" value={((props.good / (props.good + props.neutral + props.bad)) * 100) + " %"} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <Title text="statistics" />
        No feedback is given
      </div>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text="give feedback" />
      <Button click={() => setGood(good + 1)} text="good" />
      <Button click={() => setNeutral(neutral + 1)} text="neutral" />
      <Button click={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App