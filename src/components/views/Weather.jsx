import React, { Component } from "react";
import CurrentWeather from "../Weather/CurrentWeather.jsx";
import Forecast from "../Weather/Forecast.jsx";

import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  padding: 19px 16px;
  width: 480px;
  text-align: left;
  background-color: #0f0f0fec;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  position: absolute;
  top: 20px;
  left: 200px;
`;
const Spinner = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoaderText = styled.div`
  color: black;
  margin-top: 20px;
`;

const WeatherCard = (props) => {
    const {
      summary,
      temperature,
      cityName,
      iconURL,
      forecastDays,
      isLoading
    } = props;

    return (
      <div>
        {isLoading && (
          <div>
            <Spinner />
            <LoaderText>Loading....</LoaderText>
          </div>
        )}
        {!isLoading && (
          <Wrapper>
            <CurrentWeather
              cityName={cityName}
              summary={summary}
              temperature={temperature}
              icon={iconURL}
            />
            <Forecast forecastDays={forecastDays} />
          </Wrapper>
        )}
      </div>
    );
  }

export default WeatherCard;
