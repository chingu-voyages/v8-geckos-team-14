import React, { Component } from 'react';
import styled from 'styled-components';
import Todo from "./views/Todo.jsx";
import Home from './views/Home.jsx';
import PictureInfo from './views/PictureInfo.jsx';
import Pomodoro from './views/Pomodoro.jsx';
import Weather from './views/Weather.jsx';
import { Heading } from './SharedStyles.js';
import axios from "axios";
const KEY = "eaf3c33b55f54c54af693229192003";


const View = styled.div`
    display: none;

    &.view-active {
        display: block;
    }
`;

// This function is triggered by a script from FrontPage.jsx.
// All views here are hidden except default view. Views are now hidden / unhidden, instead of swapped. This ensures that we always keep the state.
class ViewRender extends Component {

    constructor(props){
        super(props);

    this.state = {
      temperature: "",
      latitude: "",
      longitude: "",
      summary: "",
      cityName: "",
      numForecastDays: 5,
      isLoading: false,
      showWeather: false
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

    render(){
      const { view } = this.props
         return (
           <div>
             <View id="weather" className="view">
               <Weather {...this.state} />
             </View>
             <View id="todo" className="view">
               <Todo />
             </View>
             <View id="pomodoro" className="view">
               <Pomodoro />
             </View>
             <View id="picture" className="view">
               <PictureInfo />
             </View>
             <View
               id="home"
               className="view view-active"
               data-view="home"
             >
               <Home />
             </View>
           </div>
         );
    }
   
}

export default ViewRender;