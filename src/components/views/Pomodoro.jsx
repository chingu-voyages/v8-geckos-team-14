import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../SharedStyles.js";
import { Wrapper, RangeSlider, TimerDisplay, Explainer, Display } from "../pomodoroStyles.js";

const RangeSliderWork = styled(RangeSlider)``;
const RangeSliderBreak = styled(RangeSlider)``;
const WorkDisplay = styled(TimerDisplay)``;
const BreakDisplay = styled(TimerDisplay)``;
const Work = styled(Explainer)``;
const Break = styled(Explainer)``;

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
            button: <TomatoButton onClick={e => this.startWork(e)}>Start</TomatoButton>,
            duration: 7000,
            break: 70000,
            start: null,
            intervalWork: null,
            intervalBreak: null,
            display: () => { return Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60)) }
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
                {this.state.button}
            </Wrapper>
        );
    }

    startWork = (e) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            reset: "Reset",
            button: <TomatoButton onClick={e => this.pauseWork(e)}>Pause</TomatoButton>
        })
        this.state.intervalWork = setInterval(this.timerWork, 10);
    }

    pauseWork = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalWork);
        let helpDisplay = this.state.display();
        this.setState({
            button: <TomatoButton onClick={e => this.startWork(e)}>Start</TomatoButton>,
            duration: this.elapsing(this.state.duration, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
    }

    timerWork = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
        } else if (this.elapsing(this.state.duration, this.state.start) < 15 ) {
            this.startBreak();
        } else {
            this.setState({ display: () => { return this.minutes(this.state.duration, this.state.start).toString() + ":" + this.seconds(this.state.duration, this.state.start).toString() } })
        }
    }

    startBreak = (e) => {
        if (e) {
            e.preventDefault()
        }
        clearInterval(this.state.intervalWork);
        this.setState({
            reset: "Reset",
            button: <TomatoButton onClick={e => this.pauseBreak(e)}>Pause</TomatoButton>,
            duration: this.elapsing(this.state.duration, this.state.start),
            start: null,
            display: () => { return Math.floor(this.state.break / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.break / 1000 % 60)) }
        })
        this.state.intervalBreak = setInterval(this.timerBreak, 10);
    }

    pauseBreak = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalBreak);
        let helpDisplay = this.state.display();
        this.setState({
            button: <TomatoButton onClick={e => this.startBreak(e)}>Start</TomatoButton>,
            break: this.elapsing(this.state.break, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
    }

    timerBreak = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
        } else if (this.elapsing(this.state.break, this.state.start) < 15) {
            this.startWork();
        } else {
            this.setState({ display: () => { return this.minutes(this.state.break, this.state.start).toString() + ":" + this.seconds(this.state.break, this.state.start).toString() } })
        }
    }

    //will be used to ring a sound to the user or send a notification or both
    ringingBell = () => {
        
    }

    rangeChange = (e) => {
        e.preventDefault();
        alert("a");
    }


    // ------------------ HELPING FUNCTIONS --------------------------------------------------------------------------------

    // gives back the minutes for the remaining time between duration and the calculated elapsed time
    minutes = (duration, start) => { return Math.floor(this.elapsing(duration, start) / 1000 / 60) }

    // gives back the minutes for the remaining time between duration and the calculated elapsed time. 
    // Formatted to display 1 second as 01
    seconds = (duration, start) => { return this.secondsFormatter(Math.floor(this.elapsing(duration, start) / 1000 % 60)) }

    // returns the difference between the given duration and tickingDelta --> (difference between now and the given start date)
    elapsing = (duration, start) => { return duration - this.tickingDelta(start); }

    // returns the difference between now and the given start date
    tickingDelta = (start) => { return Math.round((start - Date.now()) * -1) }

    //if the seconds which is needed to be display is only in 0 didgets it gets a 0 before it.
    //1 --> 01 ; 59 --> 59
    secondsFormatter = (currentTime) => {
        let seconds = currentTime.toString().length == 1 ? "0" + currentTime.toString() : currentTime;
        return seconds
    }
}
