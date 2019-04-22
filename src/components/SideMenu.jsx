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
        const { weather, menuSettings } = this.props;
            return (
              <Menu>
                <Button
                  onClick={e => this.changeView(e, "weather")}
                  style={{visibility: menuSettings.weatherMenu ? 'visible' : 'hidden' }}
                >
                  <ButtonDetails>
                      <img
                        src={weather.iconURL}
                        alt={weather.summary}
                        width="30"
                        height="30"
                      />
                      <br />
                    {weather.temperature}°c
                  </ButtonDetails>
                </Button>
                <Button
                  onClick={e => this.changeView(e, "todo")}
                  style={{visibility: menuSettings.todoMenu ? 'visible' : 'hidden' }}
                >
                  ToDo
                </Button>
                <Button
                  onClick={e => this.changeView(e, "pomodoro")}
                  style={{visibility: menuSettings.pomodoroMenu ? 'visible' : 'hidden' }}
                >
                  Pomo
                </Button>
                <Button
                  onClick={e => this.changeView(e, "picture")}
                  style={{visibility: menuSettings.pictureMenu ? 'visible' : 'hidden' }}
                >
                  Info
                </Button>
                <Button style={{position: "absolute", bottom: "10px"}}
                  onClick={e => this.changeView(e, "settings")}
                >
                  Settings
                </Button>
              </Menu>
            );
    }
}
