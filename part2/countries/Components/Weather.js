import React from 'react'

const Weather = (props) => {
  if (props.weatherData !== null) {
    console.log("weather function called", props.weatherData)
    return (
      <React.Fragment>
        <h2>
          Weather in {props.capital}
        </h2>
        <strong>temperature: </strong> {props.weatherData.temperature} {" Celcius"} <br/>
        <img alt={props.weatherData.weather_descriptions[0]} src={props.weatherData.weather_icons[0]}></img> <br/>
        <strong>wind: </strong> {props.weatherData.wind_speed} {" mph direction "} {props.weatherData.wind_dir}
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default Weather