import React from 'react'

const Header = ({ title }) => (<h2>{title}</h2>)

const Content = ({ parts }) => {
  const total = parts.reduce((total, part) => total += part.exercises, 0) 
  
  return (
    <div>
      {parts.map((part) => 
        <Part key={part.id} part={part} />
      )}
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {" "} {part.exercises}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course