import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "../SharedStyles.js";
import '../pomodoro.css';

const red = "#FFC9C9";
const yellow = "#FFEEC9";

//the black rectangle around all pomodoro elements
const Wrapper = styled.div`
  background: rgba(0,0,0,0.5);
  border-radius: 15px;
  width: 288px;
  height: 350px;
  display: flex;
  flex-direction:column;
  justify-content: center;
`;

//The Pomodoro/Reset Button on top
const ResetButton = styled(Button)`
  margin: 0 0 19px 86px;
  background: transparent;
  border-radius: 5px;
  position: relative;
  padding: 0;
  height: 39px;
  width: 116px;
  font-size: 0.8em;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

//2 Texts: "Work Time" and "Break time"
export const ExplanationText = styled.h2`
  margin-bottom: 12px;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.5);
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;
const WorkText = styled(ExplanationText)`color: ${yellow};`;
const BreakText = styled(ExplanationText)`color: ${red};`;

//the div surrounding the numbers of the current time
const DisplayDiv = styled.div`
  display: flex;
  justify-content: center;
`;

//displays the currently ticking time in the middle 
export const TimerDisplay = styled.h1`
  color: ${props => props.break ? red : yellow};
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  font-size: 2.5em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
`;

//button to start/pause the pomodoro
const StartButton = styled(Button)`
  background: transparent;
  margin: 0 0 0 72px;
  border-radius: 20px;
  position: relative;
  padding: 0;
  height: 72px;
  width: 144px;
  font-size: 1.5em;
  text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
`;

//The Range slider component. With its help we can select the times for the work and break time
class Range extends React.Component {
    constructor(props) {
        super(props);
    }

    updateRange = (e) => {
        this.props.updateRange(this.props.state, e.target.value);
    }

    render() {
        return (
            <div>
                <input id={this.props.id} type="range" style={{background: this.props.color}}
                    value={this.props.range}
                    //goes from 1 minute to 60 minutes
                    min="60000"
                    max="3600000"
                    step="60000"
                    onChange={this.updateRange}
                />
                {/* displays the number selected as inputs on the right side */}
                <span className="rangeLabel" style={{ color: this.props.color }}>{Math.floor(this.props.range / 1000 / 60)}</span>
            </div>
        )
    }
}


export default class Pomodoro extends Component {
    constructor() {
        super();
        this.state = {
            //the text displayed on the reset button
            reset: "Pomodoro",
            timesave: [],
            //the start/pause/resume button
            button: <StartButton onClick={e => this.firstCycle(e)}>Start</StartButton>,
            //worktime in millisconds
            duration: 1500000,
            //the breaktime in milliseconds
            break: 300000,
            //contains the js date object when the user clicks start
            start: null,
            //contains the intervals which change the displaing time
            intervalWork: null,
            intervalBreak: null,
            //the function which creates the visible output text inside the display
            display: () => {return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60))}</TimerDisplay>}
        };
    }

    render() {
        return (
            <Wrapper>
                <ResetButton onClick={e => this.reset(e)}>{this.state.reset}</ResetButton>
                <WorkText>Work time</WorkText>
                <Range range={this.state.duration} updateRange={this.updateRange} state={"duration"} color={yellow} id={"rangeWork"}/>
                <BreakText>Break time</BreakText>
                <Range range={this.state.break} updateRange={this.updateRange} state={"break"} color={red} id={"rangeBreak"}/>
                {/* displays the time output */}
                <DisplayDiv>{this.state.display()}</DisplayDiv>
                {/* the start/pause button */}
                {this.state.button}
            </Wrapper>
        );
    }

    //changes the values of duration and break when the range sliders are used
    updateRange = (state, val) => {
        if (state == "duration") {
            this.setState({
                duration: val
            })  
        } else {
            this.setState({
                break: val
            })
        }
        
    }

    //the function before the pomodoro clock starts to work
    //it saves the work and break time to enable pausing
    firstCycle = (e) => {
        e.preventDefault();
        this.setState({
            timesave: [this.state.duration, this.state.break],
            reset: "Reset"
        })
        //changes the title of the page so that one can leave the tab. It will change again upon switch between work and break
        document.title = "Work!";
        //disables the range sliders until the user hits reset
        document.getElementById("rangeWork").disabled = true;
        document.getElementById("rangeWork").style.background = "gray";
        document.getElementById("rangeBreak").disabled = true;
        document.getElementById("rangeBreak").style.background = "gray";
        this.startWork()
    }

    //starts the timer for the work time. newRound is to differentiate between pausing and a switch from break time
    //if the timer switches from breaktime the display needs one second less on display to prevent weird twitching 
    startWork = (e, newRound) => {
        if (e) {
            e.preventDefault();
        }
        //clears the break interval if its active
        clearInterval(this.state.intervalBreak);
        if (newRound) {
            this.setState({
                //button changes to enable pausing
                button: <StartButton onClick={e => this.pauseWork(e)}>Pause</StartButton>,
                start: null,
                //plain display of the working time
                display: () => { return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60 - 1))}</TimerDisplay> }
            })
        } else {
            this.setState({
                button: <StartButton onClick={e => this.pauseWork(e)}>Pause</StartButton>,
                start: null,
                display: () => { return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60))}</TimerDisplay> }
            })
        }
        this.state.intervalWork = setInterval(this.timerWork, 10);
    }

    //enables pausing the work interval. Works by disabeling the work interval and saving the remaining time
    //to the duration
    pauseWork = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalWork);
        //prevents weird twitching of the display text
        let helpDisplay = this.state.display();
        this.setState({
            button: <StartButton onClick={e => this.startWork(e, false)}>Resume</StartButton>,
            //saves the remaining time as the new duration time. Will be reseted when switching to break time
            duration: this.elapsing(this.state.duration, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
    }

    //the interval timer for the work time
    //if start is empty it saves the current js date value
    timerWork = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
            //this is when we need to switch to break time
        } else if (this.elapsing(this.state.duration, this.state.start) < 15 ) {
            this.setState({
                //resets the times, otherwise possible pauses will mess up the duration on a future cycle
                duration: this.state.timesave[0],
                break: this.state.timesave[1]
            })
            //makes a sound to indicate change to break time
            this.ringingBell("Break!");
            this.startBreak(false, true);
        } else {
            //just plain display of the currently running time
            this.setState({ display: () => { return <TimerDisplay>{this.minutes(this.state.duration, this.state.start).toString() + ":" + this.seconds(this.state.duration, this.state.start).toString()}</TimerDisplay> } })
        }
    }

    //start the break countdown
    startBreak = (e, newRound) => {
        if (e) {
            e.preventDefault()
        }
        clearInterval(this.state.intervalWork);
        //needs a correction of the display when there is a switch from the working time.
        if (newRound) {
            this.setState({
                button: <StartButton onClick={e => this.pauseBreak(e)}>Pause</StartButton>,
                start: null,
                display: () => { return <TimerDisplay break>{Math.floor(this.state.break / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.break / 1000 % 60 - 1))}</TimerDisplay> }
            })
        } else {
            this.setState({
                button: <StartButton onClick={e => this.pauseBreak(e)}>Pause</StartButton>,
                start: null,
                display: () => { return <TimerDisplay break>{Math.floor(this.state.break / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.break / 1000 % 60))}</TimerDisplay> }
            })
        }
        this.state.intervalBreak = setInterval(this.timerBreak, 10);
    }

    //enables pausing the break time, same as pauseWork
    pauseBreak = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalBreak);
        let helpDisplay = this.state.display();
        this.setState({
            button: <StartButton onClick={e => this.startBreak(e, false)}>Resume</StartButton>,
            break: this.elapsing(this.state.break, this.state.start),
            start: null,
            display: () => { return helpDisplay }
        })
    }

    //the interval timer for the break time. 
    timerBreak = () => {
        if (this.state.start === null) {
            this.setState({ start: Date.now() })
            //this is the time to switch to work time
        } else if (this.elapsing(this.state.break, this.state.start) < 15) {
            this.setState({
                //resets any possible changes from pausing
                duration: this.state.timesave[0],
                break: this.state.timesave[1]
            })
            this.ringingBell("Work!");
            this.startWork(false, true);
        } else {
            //just plain display of the currently running time
            this.setState({ display: () => { return <TimerDisplay break>{this.minutes(this.state.break, this.state.start).toString() + ":" + this.seconds(this.state.break, this.state.start).toString()}</TimerDisplay>} })
        }
    }

    //ring a sound to the user and change of title
    ringingBell = (text) => {
        //changes the title to the currently running time, work or break
        document.title = text;
        let audio = new Audio('../src/content/music/problematist__dhumm.ogg');
        audio.play();
    }

    //resets the whole pomodoro so that user can adjust time or start anew
    reset = (e) => {
        e.preventDefault();
        clearInterval(this.state.intervalWork);
        clearInterval(this.state.intervalBreak);
        this.setState({
            reset: "Pomodoro",
            timesave: [],
            button: <StartButton onClick={e => this.firstCycle(e)}> Start</StartButton >,
            duration: 1500000,
            break: 300000,
            start: null,
            intervalWork: null,
            intervalBreak: null,
            display: () => { return <TimerDisplay>{Math.floor(this.state.duration / 1000 / 60).toString() + ":" + this.secondsFormatter(Math.floor(this.state.duration / 1000 % 60))}</TimerDisplay> }
        })
        //enables the range sliders and makes them colorful again
        document.getElementById("rangeWork").disabled = false;
        document.getElementById("rangeWork").style.background = yellow;
        document.getElementById("rangeBreak").disabled = false;
        document.getElementById("rangeBreak").style.background = red;
        document.title = "MomenDev";
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