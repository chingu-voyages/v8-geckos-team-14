import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../SharedStyles.js";

const Wrapper = styled.div`
  width: 90vw;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

//the number which display the minutes remaining to work
const Display = styled.h1`
  color: white;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

//button to start the pomodoro
const TomatoButton = styled(Button)`
  padding: 0;
  height: 16vw;
  width: 16vw;
  font-size: 1.5em;
`;


export default class Pomodoro extends Component {
  constructor() {
    super();
    this.state = {
      //duration of working in milliseconds
      duration: 1500000,
      //duration of the seconds in milliseconds
      break: 300000,
      //will containt the Date object as a reference to precisely calculate the seconds
      start: null,
      // returns the difference between now and when the pomodoro was started
      delta: () => { return Math.round((this.state.start - Date.now())*-1)},
      // returns the value of the pomodoro working time and time difference between start and now
      elapsing: () => { return this.state.duration - this.state.delta();},
      //output to the screen
      display: [25,0]
    };
    this.startTicking = this.startTicking.bind(this);
    this.pauseTicking = this.pauseTicking.bind(this);
    this.timer = this.timer.bind(this);
  }

  render() {
    return (
      <Wrapper>
        <Display>{this.state.display[0] + ":" + this.state.display[1]}</Display>
        <TomatoButton
          onClick={e => this.startTicking(e)}
        >
          Start
        </TomatoButton>
      </Wrapper>
    );
  }

  //starts the pomodoro
  startTicking(e) {
    e.preventDefault();
    let interval = setInterval(this.timer, 100);
  }

  //will containt the functionality to pause the pomodoro
  pauseTicking(e) {

  }

  //timer used by the interval --> internal clock of pomodoro
  //if its the first time, is sets the starts --> date object
  //later on it updates the display based on the difference between the date object now and our point of reference
  timer() {
    if (this.state.start === null) {
      this.setState({start: Date.now()})
    } else {
      let minutes = Math.floor(this.state.elapsing() / 1000 / 60);
      let seconds = Math.floor(this.state.elapsing() / 1000 % 60);
      this.setState({display: [minutes, seconds]})
    }
  }
}
