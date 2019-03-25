import React, { Component } from "react";
import CurrentWeather from "../Weather/CurrentWeather.jsx";
import Forecast from "../Weather/Forecast.jsx";
import axios from "axios";
import styled from "styled-components";

const KEY = "eaf3c33b55f54c54af693229192003";

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

class WeatherCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: "",
      latitude: "",
      longitude: "",
      summary: "",
      cityName: "",
      numForecastDays: 5,
      isLoading: false
    };
  }
  
  componentDidMount() {
    this.getLocation();
  }

  // Use of APIXU API with latitude and longitude query
  getWeather() {
    const { latitude, longitude, numForecastDays } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${KEY}&q=${latitude},${longitude}&days=${numForecastDays}`;
    axios
      .get(URL)
      .then(res => {
        const data = res.data;

        this.setState({
          cityName: data.location.name + ", " + data.location.region,
          summary: data.current.condition.text,
          temperature: data.current.temp_c,
          forecastDays: data.forecast.forecastday,
          iconURL: data.current.condition.icon
        });
      })
      .catch(err => {
        if (err) console.log(err);
      });
  }

  // function using current longitude and latitude of user
  // This requires authorization from user // Could be changed using IP adress instead, but would be less precise
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          prevState => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
          () => {
            this.getWeather();
          }
        );
      },
      error => this.setState({ forecast: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {
    const {
      summary,
      temperature,
      cityName,
      iconURL,
      forecastDays,
      isLoading
    } = this.state;
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
}

export default WeatherCard;
