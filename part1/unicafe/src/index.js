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

const Statistic = ({text, value}) => {
  return <p>{text} {value}</p>
}

const Statistics = (props) => {
  const {good, neutral, bad} = props.stats;
  const all = good + neutral + bad;
  const avg = all === 0 ? 0 : ((good + bad * -1) / all).toFixed(2);
  const positive = all === 0 ? 0 : (good / all * 100).toFixed(2);

  if (all === 0) {
    return (
      <Statistic text='No feedback given' />
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td><Statistic text='Good'/></td>
          <td><Statistic value={good}/></td>
        </tr>
        <tr>
          <td><Statistic text='Neutral'/></td>
          <td><Statistic value={neutral}/></td>
        </tr>
        <tr>
          <td><Statistic text='Bad'/></td>
          <td><Statistic value={bad}/></td>
        </tr>
        <tr>
          <td><Statistic text='All'/></td>
          <td><Statistic value={all}/></td>
        </tr>
        <tr>
          <td><Statistic text='Average'/></td>
          <td><Statistic value={avg}/></td>
        </tr>
        <tr>
          <td><Statistic text='Positive'/></td>
          <td><Statistic value={positive + ' %'}/></td>
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='Give feedback'></Header>
      <Button handleClick={() => setGood(good + 1)} text='good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='bad'/>
      <Header text='Statistics'></Header>
      <Statistics stats={{good, neutral, bad}}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)