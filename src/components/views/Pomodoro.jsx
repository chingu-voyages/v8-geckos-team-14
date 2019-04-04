import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../SharedStyles.js";

const Wrapper = styled.div`
  background: rgba(0,0,0,0.4);
  border-radius: 15px;
  width: 18em;
  height: 24em;
  overflow-x: hidden;
  display: flex;
  flex-direction:column;
  justify-content: center;
`;

const Display = styled.div`
  display: flex;
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
`;

const RangeSliderWork = styled(RangeSlider)`
`;

const RangeSliderBreak = styled(RangeSlider)`
`;

//the number which display the minutes remaining to work
const WorkDisplay = styled.h1`
  color: white;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5em;
  margin-right: 1em;
`;

const BreakDisplay = styled.h1`
  color: white;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5em;
`;

//the number which display the minutes remaining to work
const Explainer = styled.h2`
  margin-bottom: 0.5em;
  color: white;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;

const Work = styled(Explainer)`
`;

const Break = styled(Explainer)`
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

const Reset = styled(Button)`
  margin: 0 0 1em calc(50% - 4.5em);
  border-radius: 5px;
  position: relative;
  padding: 0;
  height: 3em;
  width: 9em;
  font-size: 0.8em;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;


export default class Pomodoro extends Component {
    constructor() {
        super();
        this.state = {
            reset: "Pomodoro",
            button: <TomatoButton onClick={e => this.startTicking(e)}>Start</TomatoButton>,
            duration: 15000,
            break: 300000,
            start: null,
            interval: null,
            display: () => { return Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60))}
        };
    }

    render() {
        return (
            <Wrapper>
                <Reset>{this.state.reset}</Reset>
                <Work>Work time</Work>
                <RangeSliderWork
                    type="range"
                    min="1"
                    max="59"
                    onChange={(e) => this.rangeChange(e)} />
                <Break>Break time</Break>
                <RangeSliderBreak
                    type="range"
                    min="1"
                    max="59"
                    onChange={(e) => this.rangeChange(e)} />
                <Display>
                    <WorkDisplay>{this.state.display()}</WorkDisplay>
                    <BreakDisplay>{this.state.display()}</BreakDisplay>
                </Display>
                <div>{this.state.button}</div>
            </Wrapper>
        );
    }

    //starts the pomodoro
    startTicking = (e) => {
        e.preventDefault();
        this.setState({
            reset: "Reset",
            button: <TomatoButton onClick={e => this.pauseTicking(e)}>Pause</TomatoButton>
        })
        this.state.interval = setInterval(this.timer, 100);
    }

    //will containt the functionality to pause the pomodoro
    pauseTicking = (e) => {
        e.preventDefault();
        clearInterval(this.state.interval);
        let helpDisplay = this.state.display();
        this.setState({
            reset: "Reset",
            button: <TomatoButton onClick={e => this.startTicking(e)}>Start</TomatoButton>,
            duration: this.elapsing(this.state.duration, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
    }

    //timer used by the interval --> internal clock of pomodoro
    //if its the first time, is sets the starts --> date object
    //later on it updates the display based on the difference between the date object now and our point of reference
    timer = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
        } else if (this.elapsing(this.state.duration, this.state.start) < 101) {
            startBreak();
        } else {  
            this.setState({ display: () => { return this.minutes(this.state.duration, this.state.start).toString() + ":" + this.seconds(this.state.duration, this.state.start).toString() }})
        }
    }

    startBreak = () => {
        clearInterval(this.state.interval);
        this.setState({
            button: <TomatoButton onClick={e => this.pauseTicking(e)}>Pause</TomatoButton>,
            duration: this.elapsing(this.state.duration, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
        // e.preventDefault();
        // this.setState({
        //     reset: "Reset",
        //     button: <TomatoButton onClick={e => this.pauseTicking(e)}>Pause</TomatoButton>
        // })
        // this.state.interval = setInterval(this.timer, 100);
    }

    // pauseBreak = (e) => {

    //     e.preventDefault();
    //     clearInterval(this.state.interval);
    //     let helpDisplay = this.state.display();
    //     this.setState({
    //         reset: "Reset",
    //         button: <TomatoButton onClick={e => this.startTicking(e)}>Start</TomatoButton>,
    //         duration: this.elapsing(this.state.duration, this.state.start),
    //         start: null,
    //         display: () => { return helpDisplay }
    //     })
    // }

    rangeChange = (e) => {
        e.preventDefault();
        alert("a");
    }


    // ------------------ HELPING FUNCTIONS --------------------------------------------------------------------------------

     //gives back the minutes left in teh ticking time
    minutes = (duration, start) => { return Math.floor(this.elapsing(duration, start) / 1000 / 60) }

    //gives back the seconds left in teh ticking time
    seconds = (duration, start) => { return this.secondsFormatter(Math.floor(this.elapsing(duration, start) / 1000 % 60)) }

    // returns the value of the pomodoro working time and time difference between start and now
    elapsing = (duration, start) => { return duration - this.tickingDelta(start); }

    // returns the difference between now and when the pomodoro was started
    tickingDelta = (start) => { return Math.round((start - Date.now()) * -1) }

    //if the seconds which is needed to be display is only in 0 didgets it gets a 0 before it.
    //1 --> 01 ; 59 --> 59
    secondsFormatter = (currentTime) => {
        let seconds = currentTime.toString().length == 1 ? "0" + currentTime.toString() : currentTime;
        return seconds
    }

    
    
    
    
   
}
