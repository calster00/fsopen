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

const Anecdote = ({text, votes}) => {
  return (
    <div>
      <p>{text}</p>
      <p>{votes} votes</p>
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const topRated = points.indexOf(Math.max(...points))

  const getRandomAnecdote = () => {
    let newIndex = selected

    while (newIndex === selected) {
      newIndex = Math.floor(Math.random() * anecdotes.length)
    }

    setSelected(newIndex)
  }

  const addPoints = () => {
    const newPoints = [...points]
    newPoints[selected]++
    setPoints(newPoints)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={points[selected]}/>
      <Button handleClick={addPoints} text="vote"/>
      <Button handleClick={getRandomAnecdote} text="next anecdote"/>
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[topRated]} votes={points[topRated]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)