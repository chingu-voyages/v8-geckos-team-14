import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../SharedStyles.js";

const Wrapper = styled.div`
  width: 30vw;
  min-height: 30vw;
  overflow-x: hidden;
  display: flex;
  flex-direction:column;
  justify-content: center;
`;

//the number which display the minutes remaining to work
const Display = styled.h1`
  color: white;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1em;
`;

//the number which display the minutes remaining to work
const Explainer = styled.h2`
  margin-bottom: 1em;
  color: white;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

//button to start the pomodoro
const TomatoButton = styled(Button)`
  margin: 0 0 0 calc(50% - 2.5em);
  position: relative;
  padding: 0;
  height: 5em;
  width: 5em;
  font-size: 1.5em;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;


export default class Pomodoro extends Component {
    constructor() {
        super();
        this.state = {
            text: "Click the Button",
            button: <TomatoButton onClick={e => this.startTicking(e)}>Start</TomatoButton>,
            //duration of working in milliseconds
            duration: 1500000,
            //duration of the seconds in milliseconds
            break: 300000,
            //will containt the Date object as a reference to precisely calculate the seconds
            start: null,
            time: {
                // returns the difference between now and when the pomodoro was started
                delta: () => { return Math.round((this.state.start - Date.now()) * -1) },
                // returns the value of the pomodoro working time and time difference between start and now
                elapsing: () => { return this.state.duration - this.state.time.delta(); },
                minutes: () => { return Math.floor(this.state.time.elapsing() / 1000 / 60)},
                seconds: () => { return this.secondsFormatter(Math.floor(this.state.time.elapsing() / 1000 % 60))}
            },
            //output to the screen
            display: () => { return [Math.floor(this.state.duration / 1000 / 60), "00"] }
        };
    }

    render() {
        return (
            <Wrapper>
                <Explainer>{this.state.text}</Explainer>
                <Display>{this.state.display()[0] + ":" + this.state.display()[1]}</Display>
                <div>{this.state.button}</div>
            </Wrapper>
        );
    }

    //starts the pomodoro
    startTicking = (e) => {
        e.preventDefault();
        this.setState({ text: "Work time" })
        let interval = setInterval(this.timer, 100);
    }

    //will containt the functionality to pause the pomodoro
    pauseTicking = (e) => {
        e.preventDefault();
    }

    //timer used by the interval --> internal clock of pomodoro
    //if its the first time, is sets the starts --> date object
    //later on it updates the display based on the difference between the date object now and our point of reference
    timer = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
        } else {  
            this.setState({ display: () => { return [this.state.time.minutes(), this.state.time.seconds()]  }})
        }
    }

    //if the seconds which is needed to be display is only in 0 didgets it gets a 0 before it.
    //1 --> 01 ; 59 --> 59
    secondsFormatter = (currentTime) => {
        let seconds = currentTime.toString().length == 1 ? "0" + currentTime.toString() : currentTime;
        return seconds
    }
}
