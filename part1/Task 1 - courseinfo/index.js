import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.courses[0]} />
      <Part part={props.courses[1]} />
      <Part part={props.courses[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>The total number of exercises are:{" "}
        {props.parts[0].exercises + 
         props.parts[1].exercises + 
         props.parts[2].exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course_name = 'Half Stack application development'

  const courses = {
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course_name} />
      <Content courses={courses.parts}/>
      <Total parts={courses.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))