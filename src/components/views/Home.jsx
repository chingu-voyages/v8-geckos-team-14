import React, { Component } from 'react';
import styled from 'styled-components';
import Time from '../Time.jsx'
import "../searchBar.css";

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 10px 30px;
    border: 1px solid white;
    background: rgba(256, 256, 256, 0.1);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    box-shadow: 0 0 0 rgba(0,0,0, 0.2);
    transition: all ease .3s;
    cursor: default;

    &:hover {
        ${props => props.hasHover && `
            box-shadow: 0px 5px 12px rgba(0,0,0, 0.3);
            transform: translateY(-3px);
        `};
    }
`;

const NameWrapper = styled(Wrapper)`
    cursor: pointer;
`;

const InputLabel = styled.label`
    margin-right: 15px;
`;

const NameInput = styled.input`
    margin-top: 5px;
    background: transparent;
    border: none;
    border-bottom: 2px solid white;
    height: 20px;
    color: white;
    font-size: 30px;
    width: 180px;
    padding: 5px 0;
    user-select: none;

    &:focus {
        outline: 0;
    }
`;

const SearchBar = styled.div`
    position: absolute;
    top: 20px;
    display: flex;
    margin-left: 20px;

`

const Icon = styled.div`
  color: #cecece;
  position: relative;
  z-index: 1;
  font-size: 0.8vw;
  margin-left: -4vw;
  margin-top: 10px;
`;

export default class Home extends Component {
    constructor(props) {
        super(props);

        var name = localStorage.getItem('momendevName'); // Default is null

        this.state = {
          greeting: "",
          name: name,
          view: name ? "name" : "input",
          inputVal: "",
          currentTime: "",
          format: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.setName = this.setName.bind(this);
        this.editName = this.editName.bind(this);
    }

    componentDidMount() {
        var h = new Date().getHours();
        var greeting = '';
        if(h > 0 && h < 12) {
            greeting = "Good Morning,"
        } else if(h >= 12 && h < 18) {
            greeting = "Good Afternoon,"
        } else {
            greeting = "Good Evening,"
        }

        this.setState({
            greeting
        })
        setInterval(() => this.getTime(), 1000);
    }
    
    getTime(){
        const { format } = this.state
        const newT = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: format });
        this.setState({ currentTime: newT });
    }


    handleInputChange(e) {
        var value = e.target.value;

        this.setState({
            inputVal: value
        })
    }

    setName = (e) => {
        e.preventDefault();

        if(this.state.inputVal.length > 0 && this.state.inputVal !== this.state.name) {
            this.setState({
                name: this.state.inputVal,
                view: 'name',
                inputVal: ''
            });
            localStorage.setItem('momendevName', this.state.inputVal);
        }
    }

    editName = () => {
        this.setState({
            'view': 'input'
        })
    }

    changeTimeFormat = () => {
        const { format } = this.state;
        format === false ? this.setState({ format: !format}) : this.setState({ format: false})
    }

    render() {
        const { view, greeting, name, inputVal, currentTime } = this.state;

        return view === "name" ? (
          <MainWrapper>
            <SearchBar>
              <form
                method="get"
                action="https://cse.google.com/cse/publicurl"
                className="search-form"
              >
                <div>
                  <input
                    type="search"
                    title="Search this site"
                    id="q"
                    name="q"
                    alt="Search this site"
                    placeholder="Search the web"
                    maxLength="256"
                    className="search-input-box"
                  />
                  <input
                    type="hidden"
                    id="cx"
                    name="cx"
                    value="008082828295375724960:6x1afrjcypm"
                  />
                  <button type="submit" className="search-form button ">
                    <Icon>
                      <i className="fas fa-search" />
                    </Icon>
                  </button>
                </div>
              </form>
            </SearchBar>
            <Time
              currentTime={currentTime}
              onClick={this.changeTimeFormat}
            />
            <NameWrapper hasHover onClick={this.editName}>
              {greeting} {name}
            </NameWrapper>
          </MainWrapper>
        ) : (
          <Wrapper>
            <form onSubmit={this.setName}>
              <InputLabel>Name: </InputLabel>
              <NameInput
                value={inputVal}
                onChange={e => this.handleInputChange(e)}
              />
            </form>
          </Wrapper>
        );
    }
}