import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const getRandom = () => {
  // generate random number within the range
  const min = 0;
  const max = 5;
  const rand = Math.round(min + Math.random() * (max - min));
  return rand
}

const NextButton = ({ action, text }) => {
  const updateText = () => {
    const random = getRandom()
    action(random)
  }

  return (
    <button onClick={() => updateText()}>
      {text}
    </button>
  )
}

const VoteButton = ({ action, text, points, num }) => {
  const updateArr = () => {
    const copyArr = { ...points }
    copyArr[num] += 1
    action(copyArr)
  }

  return (
    <button onClick={() => updateArr()}>
      {text}
    </button>
  )
}

const GetTopAnecdotes = ({points, size, anecdotes}) => {
  var maxIndex = 0
  for (var i = 1; i < size; i++) {
    if (points[i] > points[maxIndex]) {
      maxIndex = i
    }
  }

  return (
    <p>{anecdotes[maxIndex]}</p>
  )
}

const App = (props) => {
  const size = props.length
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(Array(size).fill(0))

  return (
    <div>
      <Header text="Anecdotes of the day"/>
      {props.anecdotes[selected]}
      <br></br>
      {"has " + points[selected] +" votes"}
      <br></br>
      <VoteButton action={setPoint} text="vote" points={points} num={selected} />
      <NextButton action={setSelected} text="next anecdote"/>
      <Header text="Anecdotes with most votes"/>
      <GetTopAnecdotes points={points} size={size} anecdotes={props.anecdotes}/>
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
  <App anecdotes={anecdotes} length={anecdotes.length}/>,
  document.getElementById('root')
)