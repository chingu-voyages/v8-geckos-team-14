import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../SharedStyles.js";
import { Wrapper, RangeSlider, Explainer, Display } from "../pomodoroStyles.js";

const red = "#FFC9C9";
const yellow = "#FFEEC9";

const RangeSliderWork = styled(RangeSlider)`background: ${yellow};`;
const RangeSliderBreak = styled(RangeSlider)`background: ${red};`;
const Work = styled(Explainer)`color: ${yellow};`;
const Break = styled(Explainer)`color: ${red};`;

const Reset = styled(Button)`
  margin: 0 0 1.5em calc(50% - 4.5em);
  background: transparent;
  border-radius: 5px;
  position: relative;
  padding: 0;
  height: 3em;
  width: 9em;
  font-size: 0.8em;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

//the number which display the minutes remaining to work
export const TimerDisplay = styled.h1`
  color: ${props => props.break ? red : yellow};
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.3em;
`;

//button to start the pomodoro
const TomatoButton = styled(Button)`
  background: transparent;
  margin: 0 0 0 calc(50% - 3em);
  border-radius: 20px;
  position: relative;
  padding: 0;
  height: 3em;
  width: 6em;
  font-size: 1.5em;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;


export default class Pomodoro extends Component {
    constructor() {
        super();
        this.state = {
            reset: "Pomodoro",
            timesave: [],
            button: <TomatoButton onClick={e => this.firstCycle(e)}>Start</TomatoButton>,
            duration: 7000,
            break: 11000,
            start: null,
            intervalWork: null,
            intervalBreak: null,
            display: () => {return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60))}</TimerDisplay>}
        };
    }

    render() {
        return (
            <Wrapper>
                <Reset onClick={e => this.reset(e)}>{this.state.reset}</Reset>
                <Work>Work time</Work>
                <RangeSliderWork
                    type="range"
                    min="1"
                    max="59"
                    onChange={e => this.rangeChange(e)} />
                <Break>Break time</Break>
                <RangeSliderBreak
                    type="range"
                    min="1"
                    max="59"
                    onChange={e => this.rangeChange(e)} />
                <Display>{this.state.display()}</Display>
                {this.state.button}
            </Wrapper>
        );
    }

    firstCycle = (e) => {
        e.preventDefault();
        this.setState({
            timesave: [this.state.duration, this.state.break],
            reset: "Reset"
        })
        document.title = "Work!";
        this.startWork()
    }

    startWork = (e, newRound) => {
        if (e) {
            e.preventDefault();
        }
        clearInterval(this.state.intervalBreak);
        if (newRound) {
            this.setState({
                button: <TomatoButton onClick={e => this.pauseWork(e)}>Pause</TomatoButton>,
                start: null,
                display: () => { return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60 - 1))}</TimerDisplay> }
            })
        } else {
            this.setState({
                button: <TomatoButton onClick={e => this.pauseWork(e)}>Pause</TomatoButton>,
                start: null,
                display: () => { return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60))}</TimerDisplay> }
            })
        }
        
        this.state.intervalWork = setInterval(this.timerWork, 10);
    }

    pauseWork = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalWork);
        let helpDisplay = this.state.display();
        this.setState({
            button: <TomatoButton onClick={e => this.startWork(e, false)}>Resume</TomatoButton>,
            duration: this.elapsing(this.state.duration, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
    }

    timerWork = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
        } else if (this.elapsing(this.state.duration, this.state.start) < 15 ) {
            this.setState({
                duration: this.state.timesave[0],
                break: this.state.timesave[1]
            })
            this.ringingBell("Break!");
            this.startBreak(false, true);
        } else {
            this.setState({ display: () => { return <TimerDisplay>{this.minutes(this.state.duration, this.state.start).toString() + ":" + this.seconds(this.state.duration, this.state.start).toString()}</TimerDisplay> } })
        }
    }

    startBreak = (e, newRound) => {
        if (e) {
            e.preventDefault()
        }
        clearInterval(this.state.intervalWork);
        if (newRound) {
            this.setState({
                button: <TomatoButton onClick={e => this.pauseBreak(e)}>Pause</TomatoButton>,
                start: null,
                display: () => { return <TimerDisplay break>{Math.floor(this.state.break / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.break / 1000 % 60 - 1))}</TimerDisplay> }
            })
        } else {
            this.setState({
                button: <TomatoButton onClick={e => this.pauseBreak(e)}>Pause</TomatoButton>,
                start: null,
                display: () => { return <TimerDisplay break>{Math.floor(this.state.break / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.break / 1000 % 60))}</TimerDisplay> }
            })
        }
        this.state.intervalBreak = setInterval(this.timerBreak, 10);
    }

    pauseBreak = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalBreak);
        let helpDisplay = this.state.display();
        this.setState({
            button: <TomatoButton onClick={e => this.startBreak(e, false)}>Resume</TomatoButton>,
            break: this.elapsing(this.state.break, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
    }

    timerBreak = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
        } else if (this.elapsing(this.state.break, this.state.start) < 15) {
            this.setState({
                duration: this.state.timesave[0],
                break: this.state.timesave[1]
            })
            this.ringingBell("Work!");
            this.startWork(false, true);
        } else {
            this.setState({ display: () => { return <TimerDisplay break>{this.minutes(this.state.break, this.state.start).toString() + ":" + this.seconds(this.state.break, this.state.start).toString()}</TimerDisplay>} })
        }
    }

    //will be used to ring a sound to the user or send a notification or both
    ringingBell = (text) => {
        document.title = text;
        let audio = new Audio('../src/content/music/problematist__dhumm.ogg');
        audio.play();
    }

    rangeChange = (e) => {
        e.preventDefault();
        alert("a");
    }

    reset = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalWork);
        clearInterval(this.state.intervalBreak);
        this.setState({
            reset: "Pomodoro",
            timesave: [],
            button: <TomatoButton onClick={e => this.firstCycle(e)}> Start</TomatoButton >,
            duration: 7000,
            break: 11000,
            start: null,
            intervalWork: null,
            intervalBreak: null,
            display: () => { return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60))}</TimerDisplay> }
        })
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
