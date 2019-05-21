import React, { Component } from "react";
import styled from "styled-components";
import SideMenu from "./SideMenu.jsx";
import ViewRender from "./ViewRender.jsx";
import Quotes from "./Quotes.jsx";
import axios from "axios";
import ls from 'local-storage';
const KEY = "eaf3c33b55f54c54af693229192003";
import "./searchBar.css";

//stylings for the overall container of the app
const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background: url("../src/content/gfx/app-bg-image.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
`;

//styling for the main div where components are loaded in
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 100vh;
`;

//styling of the Quotes wrapper
const QuoteWrapper = styled.div`
  position: absolute;
  bottom: 20px;
`;

const SearchBar = styled.div`
  position: absolute;
  top: 20px;
`;

const Icon = styled.div`
  color: #cecece;
  position: relative;
  z-index: 1;
  font-size: 0.8vw;
  margin-left: -4vw;
  margin-top: 10px;
`;

//the overall component with everything on screen
export default class Frontpage extends Component {
  constructor() {
    super();

    this.state = {
      mainState: null,
      menuState: null,
      weather: {
        temperature: "",
        summary: "",
        cityName: "",
        isLoading: false,
      },
      menuSettings: {
        weatherMenu: ls.get('weatherMenu')== null ? true :ls.get('weatherMenu'),
        todoMenu: ls.get('todoMenu')== null ? true :ls.get('todoMenu'),
        pomodoroMenu: ls.get('pomodoroMenu')== null ? true :ls.get('pomodoroMenu'),
        pictureMenu: ls.get('pictureMenu')== null ? true :ls.get('pictureMenu')
      }
    };

    this.changeView = this.changeView.bind(this);
    this.handleSettngsMenu= this.handleSettngsMenu.bind(this);
  }
  componentDidMount() {
    this.getLocation();
  }

  handleSettngsMenu () {
    this.setState({
      menuSettings: {
        ...this.state.menuSettings,
        weatherMenu: ls.get('weatherMenu')== null ? true :ls.get('weatherMenu'),
        todoMenu: ls.get('todoMenu')== null ? true :ls.get('todoMenu'),
        pomodoroMenu: ls.get('pomodoroMenu')== null ? true :ls.get('pomodoroMenu'),
        pictureMenu: ls.get('pictureMenu')== null ? true :ls.get('pictureMenu')
      }
  })
  };

  // Use of APIXU API with latitude and longitude query
  getWeather(coords) {
    const { latitude, longitude } = coords;
    const numForecastDays = 5;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${KEY}&q=${latitude},${longitude}&days=${numForecastDays}`;
    axios
      .get(URL)
      .then(res => {
        const data = res.data;

        this.setState({
          weather: {
            ...this.state.weather,
            cityName: data.location.name + ", " + data.location.region,
            summary: data.current.condition.text,
            temperature: data.current.temp_c,
            forecastDays: data.forecast.forecastday,
            iconURL: data.current.condition.icon
          }
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
        this.getWeather(position.coords);
      },
      error =>
        this.setState({
          forecast: error.message
        }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }
  // Change menu based on state. If the state is same value, it means the button is clicked again, and it should toss the state.
  changeView(value) {
    if (this.state.menuState !== value) {
      this.setState({
        menuState: value
      });
      // Hide views, activate new view
      const oldView = document.querySelector(".view-active");
      const newView = document.getElementById(value);
      oldView.classList.remove("view-active");
      newView.classList.add("view-active");
    } else {
      this.setState({
        menuState: null
      });
      // Hide views, show default view
      const oldView = document.querySelector(".view-active");
      const newView = document.getElementById("home");
      oldView.classList.remove("view-active");
      newView.classList.add("view-active");
    }
  }

  render() {
    const { weather, menuSettings } = this.state
    return (
      <PageWrapper>
        <SideMenu
          changeView={this.changeView}
          weather={weather}
          menuSettings={menuSettings}
        />

        <Main>
          <SearchBar>
            <form
              method="get"
              action="https://cse.google.com/cse/publicurl"
              className="search-form"
            >
              <div>
                <input
                  type="search"
                  title="Search this site"
                  id="q"
                  name="q"
                  alt="Search this site"
                  placeholder="Search the web"
                  maxLength="256"
                  className="search-input-box"
                />
                <input
                  type="hidden"
                  id="cx"
                  name="cx"
                  value="008082828295375724960:6x1afrjcypm"
                />
                <button type="submit" className="search-form button ">
                  <Icon>
                    <i className="fas fa-search" />
                  </Icon>
                </button>
              </div>
            </form>
          </SearchBar>
          <ViewRender
            view={this.state.menuState}
            weather={weather}
            handleSettngsMenu={this.handleSettngsMenu}
          />
        </Main>
        <QuoteWrapper>
          <Quotes />
        </QuoteWrapper>
      </PageWrapper>
    );
  }
}
