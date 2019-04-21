import React from "react";
import styled from 'styled-components';

const Menu = styled.div`
  width: 10vw;
  height: 90vh;
  overflow-x: hidden;
`;

const Button = styled.button`
    outline: none;
    display: block;
    height: 8vw;
    width: 8vw;
    margin: 1vw 0 0 1vw;
    transition: transform 0.25s;
    letter-spacing: 0.2rem;
    border-radius: 50%;
    border: 2px solid white;
    background: rgba(256, 256, 256, 0.1);
    color: white;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;

    :active {
      transform: scale(0.96);
    }

    :hover {
      opacity: 1;
    }
`;

const ButtonDetails = styled.div`
  text-transform: lowercase;
  font-size: 10px;
  margin: 5px;

  @media (min-width: 1400px) {
    font-size: 20px
  }
`;

//the menu component get the function for the state changes as props
export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    changeView(e, view) {
      e.preventDefault();
      this.props.changeView(view);
    }

    render() {
            return (<Menu>
              <Button onClick={(e) => this.changeView(e, "weather")}>
                12°C
              </Button>
              <Button onClick={(e) => this.changeView(e, "todo")}>
                ToDo
              </Button>
              <Button onClick={(e) => this.changeView(e, "pomodoro")}>
                Pomo
              </Button>
              <Button onClick={(e) => this.changeView(e, "picture")}>
                Info
              </Button>
            </Menu>);
    }
}
