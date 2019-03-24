import React, { Component } from "react";
import styled from 'styled-components';
import ToDo from './toDo.jsx';

import SideMenu from "./SideMenu.jsx";
import ViewRender from './ViewRender.jsx';
import Quotes from './Quotes.jsx'
import { Heading } from './SharedStyles.js';
import ToDo from './toDo.jsx';


//stylings for the overall container of the app
const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  background: url('../src/content/gfx/app-bg-image.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
`;



//styling for the main div where components are loaded in
const Main = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 100vh;
`;

//styling of the Quotes wrapper
const QuoteWrapper = styled.div`
  position: absolute;
  bottom: 20px;
`

//the overall component with everything on screen
export default class Frontpage extends Component {
  constructor() {
    super();


    this.state = {
      mainState: null,
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
      // Hide views, activate new view
      const oldView = document.querySelector('.view-active');
      const newView = document.getElementById(value);
      oldView.classList.remove('view-active');
      newView.classList.add('view-active');
    }
    else {
      this.setState({
        menuState: null
      })
      // Hide views, show default view
      const oldView = document.querySelector('.view-active');
      const newView = document.getElementById('home');
      oldView.classList.remove('view-active');
      newView.classList.add('view-active');
    }
  }

  render() {
    return (


      <PageWrapper>
        <SideMenu changeView={this.changeView} />
        <Main>
          <ViewRender view={this.state.menuState} />
        </Main>
        <QuoteWrapper>
          <Quotes />
        </QuoteWrapper>
        <QuoteWrapper>
          <ToDo />
        </QuoteWrapper>
      </PageWrapper>


    );
  }
}
