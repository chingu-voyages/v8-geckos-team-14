import React from "react";
import styled from 'styled-components';
import ls from 'local-storage';

const Heading = styled.h1`
  color: black;
  font-size: 2em;
  font-weight: bold;
`;

const MenuSettingsDiv = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 250px;
`;

const MenuSettingsUl = styled.ul`
  margin: 0;
  padding: 0;
  overflow: auto;
  max-height: 500px;
`;

const MenuSettingsLi = styled.li`
  cursor: pointer;
  position: relative;
  padding: 5px 40px 12px 8px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;



class Settings extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      weatherMenu: ls.get('weatherMenu')== null ? true :ls.get('weatherMenu'),
      todoMenu: ls.get('todoMenu')== null ? true :ls.get('todoMenu'),
      pomodoroMenu: ls.get('pomodoroMenu')== null ? true :ls.get('pomodoroMenu'),
      pictureMenu: ls.get('pictureMenu')== null ? true :ls.get('pictureMenu')
    }

  }




  toggleCheckbox = (event) => {
    // this.setState({weather: event.target.value});
    // ls.set('weather',event.target.value);
    let key = event.target.name;

    this.setState(prevState => (
      {
        ...prevState,
        [key]: !prevState[key]
      }
    ));


    ls.set(
      key, !ls.get(key)

    )
    const { handleSettngsMenu } = this.props;
    handleSettngsMenu();

  }



  renderList = (key) => {
    let menuItemValue = this.state[key];
    return(
      <MenuSettingsLi key={key}>
        <label>
          <input
            type="checkbox"
            defaultChecked={menuItemValue}
            onChange={this.toggleCheckbox}
            name={key}
          />
          {key}
        </label>
      </MenuSettingsLi>
    )
  }


  render () {

    return (
      <MenuSettingsDiv>
            <Heading> Menu Settings</Heading>

            <MenuSettingsUl>
              {Object.keys(this.state).map(this.renderList)}
            </MenuSettingsUl>

      </MenuSettingsDiv>
    )

  }

}

export default Settings;
