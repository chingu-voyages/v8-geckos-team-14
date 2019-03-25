import React from "react";
import styled from 'styled-components';
import ls from 'local-storage';

const Heading = styled.h1`
  color: black;
  font-size: 2em;
  font-weight: bold;
`;


class ToDo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: ls.get('visible') || 'todo-popup-container-hidden',
      value: ls.get('value') || '',
      todoItems: ls.get('todoItems') || [],
      strike: ls.get('strike') || ''
    }
    console.log('constructor',this.state );

  }

  toggleClass = (event) => {
    let visible = {...this.state.visible};
    if(this.state.visible === 'todo-popup-container-hidden') {
      visible = 'todo-popup-container';
      this.setState({visible});
      ls.set('visible',visible);
    } else {
      visible = 'todo-popup-container-hidden';
      this.setState({visible});
      ls.set('visible',visible);
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    ls.set('value',event.target.value);
  }

  handleSubmit = (event) => {

    event.preventDefault();
      console.log('kkkkkkk',this.state.todoItems);
    const newTodoItems = [...this.state.todoItems, this.state.value];

    this.setState({
      value: '',
      todoItems: newTodoItems
    });

    ls.set('value','');
    console.log('22222',this.state );
    ls.set('todoItems', newTodoItems);
    console.log('3333',this.state );
  }

  deleteTodoItem = (key) => {
    let todoItems = {...this.state.todoItems};
    delete todoItems[key];
    this.setState({todoItems});
    ls.set('todoItems', todoItems);
  }

  renderList = (key) => {
    let listItem = this.state.todoItems[key];
    return(
          <li key={key}> {listItem} <i count={key} className="fa fa-times-circle" onClick={(event) => this.deleteTodoItem(key)}>X</i></li>
    )
  }

  render () {
    return (
      <div className="todo-wrapper">
        <div className={this.state.visible}>
          <ul className="todos-here">
            {Object.keys(this.state.todoItems).map(this.renderList)}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.value} className="todo-input" type="text" placeholder="Write your todos here" />
          </form>
        </div>
        <button onClick={this.toggleClass} className="todo-btn">ToDo</button>
      </div>
    )
  }

}

export default Todo;
