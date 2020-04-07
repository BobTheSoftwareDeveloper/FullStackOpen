import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({ action, text, amount, setTotal, total }) => {
  const setAction = () => {
      action(amount)
      setTotal(total + 1)
  }
  return (
    <button onClick={setAction}>
      {text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <React.Fragment>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </React.Fragment>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  const average = (props.good - props.bad) / props.total 
  const positive = ((props.good) / props.total) * 100 + " %"

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <Statistic text="good" value={props.good} />
          </tr>
          <tr>
            <Statistic text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <Statistic text="bad" value={props.bad} />
          </tr>
          <tr>
            <Statistic text="all" value={props.total} />
          </tr>
          <tr>
            <Statistic text="average" value={average} />
          </tr>
          <tr>
            <Statistic text="positive" value={positive} />
          </tr>
        </tbody>
      </table> 
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <div>
      <Header title="give feedback" />
      <Button action={setGood} text="good" amount={good + 1} setTotal={setTotal} total = {total} />
      <Button action={setNeutral} text="neutral" amount={neutral + 1} setTotal={setTotal} total = {total} />
      <Button action={setBad} text="bad" amount={bad + 1} setTotal={setTotal} total = {total} />
      <Statistics total={total} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)