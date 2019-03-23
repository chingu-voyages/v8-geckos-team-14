import React, { Component } from "react";
import styled from 'styled-components';
import SideMenu from "./SideMenu.jsx";
import ToDo from "./Todo.jsx";
import Todo from "./Todo.jsx";

//stylings for the overall container of the app
const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background: #7C5CE4;
  display: flex;
  justify-content: center;
`;

// styling for the current welcoming text
const Heading = styled.h1`
  color: black;
  font-size: 2em;
  font-weight: bold;
`;

//styling for the main div where components are loaded in
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 100vh;
`;


export default class Frontpage extends Component {
  constructor() {
    super();
    this.state = { 
      mainState: <Heading>Start</Heading>,
      menuState: null
    };
    this.menuStateSetter = this.menuStateSetter.bind(this);
  }

  //upon change of the menuState by the menu component the different main contents will be loaded in
  menuStateSetter(e, state) {
    e.preventDefault();
    
    switch (state) {
      case "weather":
        if (this.state.menuState !== "weather") {
          this.setState({ 
            menuState: "weather",
            mainState: <Heading>Filler for weather App</Heading>
          })
        } else {
          this.setState({
            menuState: null,
            mainState: <Heading>Default Welcome!</Heading>
          })
        }
        break;
      case "todo":
        if (this.state.menuState !== "todo") {
          this.setState({ 
            menuState: "todo",
            mainState: <Todo/>
          })
        } else {
          this.setState({
            menuState: null,
            mainState: <Heading>Default Welcome!</Heading>
          })
        }
        break;
      case "pomodoro":
        if (this.state.menuState !== "pomodoro") {
          this.setState({ 
            menuState: "pomodoro",
            mainState: <Heading>Filler for pomodoro clock</Heading>
          })
        } else {
          this.setState({
            menuState: null,
            mainState: <Heading>Default Welcome!</Heading>
          })
        }
        break;
      case "info":
        if (this.state.menuState !== "info") {
          this.setState({ 
            menuState: "info",
            mainState: <Heading>Filler for picture info</Heading>
          })
        } else {
          this.setState({
            menuState: null,
            mainState: <Heading>Default Welcome! In ther full App that would be empty</Heading>
          })
        }
        break;
      }
  }

  render() {
    return (
        <PageWrapper>
        <SideMenu menuStateSetter={this.menuStateSetter}/>
          <Main>
            {this.state.mainState}
          </Main> 
        </PageWrapper>
    );
  }
}