import React from 'react';
import styled from 'styled-components';
import Todo from "./views/Todo.jsx";
import Home from './views/Home.jsx';
import PictureInfo from './views/PictureInfo.jsx';
import Pomodoro from './views/Pomodoro.jsx';
import Weather from './views/Weather.jsx';
import { Heading } from './SharedStyles.js';

const View = styled.div`
    display: none;

    &.view-active {
        display: block;
    }
`;

// This function is triggered by a script from FrontPage.jsx.
// All views here are hidden except default view. Views are now hidden / unhidden, instead of swapped. This ensures that we always keep the state.
  class ViewRender extends Component {

    constructor(props) {
      super(props);
    }

    render() {
      const { view, weather } = this.props
      return (
        <div>
          <View id="weather" className="view">
            <Weather weather={weather} />
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