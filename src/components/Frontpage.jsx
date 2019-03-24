import React, { Component } from "react";
import styled from 'styled-components';
import SideMenu from "./SideMenu.jsx";
import ViewRender from './ViewRender.jsx';

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

//the overall component with everything on screen
export default class Frontpage extends Component {
  constructor() {
    super();
    this.state = { 
      mainState: <Heading>Start</Heading>,
      menuState: null
    };

    this.changeView = this.changeView.bind(this);
  }

  // Change menu based on state. If the state is same value, it means the button is clicked again, and it should toss the state.
  changeView(value) {
    if(this.state.menuState !== value) {
      this.setState({
        menuState: value
      })
    }
    else {
      this.setState({
        menuState: null
      })
    }
  }

  render() {
    return (
        <PageWrapper>
        <SideMenu changeView={this.changeView}/>
          <Main>
            <ViewRender view={this.state.menuState} />
          </Main> 
        </PageWrapper>
    );
  }
}