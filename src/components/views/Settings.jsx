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
      weatherMenu: {
        value: ls.get('weatherMenu')== null ? true :ls.get('weatherMenu'),
        label: 'Show Weather'
      },

      todoMenu: {
        value: ls.get('todoMenu')== null ? true :ls.get('todoMenu'),
        label: 'Show Todo'
      },

      pomodoroMenu: {
        value: ls.get('pomodoroMenu')== null ? true :ls.get('pomodoroMenu'),
        label: 'Show Pomodoro'
      },

      pictureMenu: {
        value: ls.get('pictureMenu')== null ? true :ls.get('pictureMenu'),
        label: 'Show Info'
      },

      quoteMenu: {
        value: ls.get('quoteMenu')== null ? true :ls.get('quoteMenu'),
        label: 'Show Quote'
      },

      greetingMenu: {
        value: ls.get('greetingMenu')== null ? true :ls.get('greetingMenu'),
        label: 'Show Greeting'
      },

    }

  }




  toggleCheckbox = (event) => {
    // this.setState({weather: event.target.value});
    // ls.set('weather',event.target.value);
    let key = event.target.name;

    this.setState(prevState => (
      {
        ...prevState,
        [key]: {
          value: !prevState[key]['value'],
          label: prevState[key]['label']
        }
      }
    ));


    ls.set(
      key, !ls.get(key)

    )
    const { handleSettngsMenu } = this.props;
    handleSettngsMenu();

  }



  renderList = (key) => {
    let menuItemValue = this.state[key]['value'];
    let menuItemLabel = this.state[key]['label'];
    return(
      <MenuSettingsLi key={key}>
        <label>
          <input
            type="checkbox"
            defaultChecked={menuItemValue}
            onChange={this.toggleCheckbox}
            name={key}
          />
          {menuItemLabel}
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
