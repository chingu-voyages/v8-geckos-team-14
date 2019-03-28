import React from "react";
import styled from 'styled-components';
import { Button } from "./SharedStyles.js";

const Menu = styled.div`
  width: 10vw;
  height: 90vh;
  overflow-x: hidden;
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
