import React from 'react';
import styled from 'styled-components';

// styling for the current welcoming text
const Heading = styled.h1`
  color: black;
  font-size: 2em;
  font-weight: bold;
`;

//this function is used as a props for the side menu and when the user clicks a buttons, the right components gets loaded in into the main area
//might need changes in the future when we have a pomodoro clock which has to send some sort of notification even without being on screen
const Home = () => {
    return <Heading>Frontpage component</Heading>
}

export default Home;