import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Paragraph = ({text}) => {
  return <p>{text}</p>
}

const Statistics = (props) => {
  const {good, neutral, bad} = props.stats;
  const all = good + neutral + bad;
  const avg = all === 0 ? 0 : ((good + bad * -1) / all).toFixed(2);
  const positive = all === 0 ? 0 : (good / all * 100).toFixed(2);

  return (
    <div>
      <Paragraph text={'Good: ' + good} />
      <Paragraph text={'Neutral: ' + neutral} />
      <Paragraph text={'Bad: ' + bad} />
      <Paragraph text={'All: ' + all} />
      <Paragraph text={'Average: ' + avg} />
      <Paragraph text={'Positive: ' + positive + '%'} />
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
      <Header text="Give feedback"></Header>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Header text="Statistics"></Header>
      <Statistics stats={{good, neutral, bad}}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)