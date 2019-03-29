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

const RangeSlider = styled.input.attrs(({ inputType, min ,max }) => ({
    type: inputType,
    min: min,
    max: max
}))`
    -webkit-appearance: none;
    width: 70%;
    border-radius: 5px;  
    margin: 0 0 1em 15%;
    height: 1em;
    background: #d3d3d3;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        border-radius: 50%;  
        width: 25px;
        height: 25px;
        background: #fff;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        background: #fff;
        cursor: pointer;
    }
`

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
            text: "Slide the timer to set your working time",
            button: <TomatoButton onClick={e => this.startTicking(e)}>Start</TomatoButton>,
            duration: 1500000,
            break: 300000,
            start: null,
            display: () => { return Math.floor(this.state.duration / 1000 / 60).toString() + ":00"}
        };
    }

    render() {
        return (
            <Wrapper>
                <Explainer>{this.state.text}</Explainer>
                <RangeSlider
                    type="range"
                    min="1"
                    max="59"
                    onChange="" />
                <Display>{this.state.display()}</Display>
                <div>{this.state.button}</div>
                <Reset>Reset</Reset>
            </Wrapper>
        );
    }

    //starts the pomodoro
    startTicking = (e) => {
        e.preventDefault();
        this.setState({ 
            text: "Work time",
            button: <TomatoButton onClick={e => this.pauseTicking(e)}>Pause</TomatoButton>
        })
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
            this.setState({ display: () => { return this.minutes().toString() + ":" + this.seconds().toString() }})
        }
    }


    // ------------------ HELPING FUNCTIONS --------------------------------------------------------------------------------


    //output to the screen
    startMinutesDisplay = (duration) => { }

    //if the seconds which is needed to be display is only in 0 didgets it gets a 0 before it.
    //1 --> 01 ; 59 --> 59
    secondsFormatter = (currentTime) => {
        let seconds = currentTime.toString().length == 1 ? "0" + currentTime.toString() : currentTime;
        return seconds
    }

    // returns the difference between now and when the pomodoro was started
    tickingDelta = () => { return Math.round((this.state.start - Date.now()) * -1) }
    
    // returns the value of the pomodoro working time and time difference between start and now
    elapsing = () => { return this.state.duration - this.tickingDelta(); }
    
    //gives back the minutes left in teh ticking time
    minutes = () => { return Math.floor(this.elapsing() / 1000 / 60) }

    //gives back the seconds left in teh ticking time
    seconds = () => { return this.secondsFormatter(Math.floor(this.elapsing() / 1000 % 60)) }
}
