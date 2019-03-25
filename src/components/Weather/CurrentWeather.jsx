import React from "react";
import styled from "styled-components";

/* Main Weather Area */
const Current = styled.div`
  color: #fff;
  text-align: left;
`;
/* Header */
const CurrentHeader = styled.div`
  margin: 0;
  position: relative;
	display: flex;
	flex-direction: column;
  justify-content: space-between;
`;
/* Weather CurrentLocation */

const CurrentLocation = styled.div`
  min-width: 0;
  display: inline-block;
  flex: 0 1 auto;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
`;
const LocationName = styled.div`
	min-height: 24px;
  min-width: 32px;
  max-width: 310px;
  margin: 5px 0px;
  display: inline;
  flex: 0 1 auto;
  align-self: baseline;
  cursor: pointer;
  font-size: 118.75%;
  outline: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* Weather Condition of the day*/
const CurrentCondition = styled.div`
	margin: -2px 0 10px;
  display: block;
  line-height: 125%;
	opacity: .7;
	margin: 5px 0px;
`

const CurrentTemperature = styled.div`
	margin-bottom: 8px;
	display: flex;
	transition: filter .2s;
`
const Img = styled.div`
	margin-right: 10px;
  font-size: 58px;
` 

const Temperature = styled.div`
	font-size: 60px;
`

const CurrentWeather = (props) => {
  const { summary, temperature, cityName, icon } = props;
  const roundedTemp = Math.round(temperature)
  return (
    <Current>
      <CurrentHeader>
        <CurrentLocation>
          <Location>
            <LocationName>{cityName}</LocationName>
          </Location>
        </CurrentLocation>
        <CurrentCondition>{summary}</CurrentCondition>
      </CurrentHeader>
      <CurrentTemperature>
        <Img>
          <img src={icon} alt="raining-weather" width="60" height="60" />
        </Img>
        <Temperature>{roundedTemp}°c</Temperature>
      </CurrentTemperature>
  </Current>
  )

  };

export default CurrentWeather;
