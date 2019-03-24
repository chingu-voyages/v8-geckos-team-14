import React from 'react';
import styled from 'styled-components';
import Todo from "./views/Todo.jsx";
import Home from './views/Home.jsx';
import PictureInfo from './views/PictureInfo.jsx';
import Pomodoro from './views/Pomodoro.jsx';
import Weather from './views/Weather.jsx';
import { Heading } from './SharedStyles.js';

//this function is used as a props for the side menu and when the user clicks a buttons, the right components gets loaded in into the main area
//might need changes in the future when we have a pomodoro clock which has to send some sort of notification even without being on screen
const ViewRender = ({ view }) => {
    switch (view) {
        case "weather":
            return <Weather />
        case "todo":
            return <Todo />
        case "pomodoro":
            return <Pomodoro />
        case "info":
            return <PictureInfo />
        default: 
            return <Home />
      }
}

export default ViewRender;