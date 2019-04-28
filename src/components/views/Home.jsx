import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 10px 30px;
    border: 1px solid white;
    background: url('../src/content/gfx/app-bg-image-blurry.jpg');
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

export default class Home extends Component {
    constructor(props) {
        super(props);

        var name = localStorage.getItem('momendevName'); // Default is null
        var greetingMenu = localStorage.getItem('greetingMenu')== null ? true : localStorage.getItem('greetingMenu');

        this.state = {
            greeting: '',
            name: name,
            view: name ? 'name' : 'input',
            inputVal: '',
            greetingMenu: greetingMenu,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.setName = this.setName.bind(this);
        this.editName = this.editName.bind(this);
    }

    componentDidMount() {
        var h = new Date().getHours() % 12;

        var greeting = '';
        if(h <= 0 && h < 12) {
            greeting = "Good Morning,"
        } else if(h <= 12 && h < 18) {
            greeting = "Good Evening,"
        } else {
            greeting = "Good Night,"
        }

        this.setState({
            greeting
        })
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

    render() {
        const { view, greeting, name, inputVal, greetingMenu } = this.state;

if (greetingMenu=='true')
{
        return view === "name" ? (
            <NameWrapper
              hasHover
              onClick={this.editName}
            >
                {greeting} {name}
            </NameWrapper>
        ) : (
            <Wrapper>
                <form onSubmit={this.setName}>
                    <InputLabel>Name: </InputLabel>
                    <NameInput value={inputVal} onChange={(e) => this.handleInputChange(e)} />
                </form>
            </Wrapper>
        )
      }
      else {
        return <div></div>
    }
    }
}
