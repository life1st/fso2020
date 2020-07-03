import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, n}) => (
  <p>{text} {n}</p>
)
const Statistics = ({
  good, neutral, bad
}) => {

  const all = good + neutral + bad
  const hasFeedback = good > 0 || neutral > 0 || bad > 0
  if (!hasFeedback) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <Statistic text={'good'} n={good}/>
      <Statistic text={'neutral'} n={neutral}/>
      <Statistic text={'bad'} n={bad}/>
      <Statistic text={'all'} n={all}/>
      <Statistic text={'average'} n={(good - bad) / all || 0}/>
      <Statistic text={'positive'} n={(good / all) * 100 + '%' || 0}/>
    </div>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)