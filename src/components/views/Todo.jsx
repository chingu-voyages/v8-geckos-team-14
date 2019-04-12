import React from "react";
import styled from 'styled-components';
import ls from 'local-storage';

const Heading = styled.h1`
  color: black;
  font-size: 2em;
  font-weight: bold;
`;

const TodoDiv = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 250px;
`;

const TodoUl = styled.ul`
  margin: 0;
  padding: 0;
  overflow: auto;
  max-height: 500px;
`;

const TodoLi = styled.li`
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

const TodoDelete = styled.i`
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
`;


const TodoHeader = styled.div`
  background-color: transparent;
  padding: 40px 20px;
  color: white;
  text-align: center;
`;

const TodoInput = styled.input`
  margin: 0;
  border: none;
  border-radius: 0;
  width: 90%;
  padding: 5px;
  float: left;
  font-size: 16px;
`;


class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: ls.get('visible') || 'todo-popup-container-hidden',
      value: ls.get('value') || '',
      todoItems:  ls.get('todoItems') || [],
      strike: ls.get('strike') || ''
    }

  }


  handleChange = (event) => {
    this.setState({value: event.target.value});
    ls.set('value',event.target.value);
  }

  handleSubmit = (event) => {

    event.preventDefault();
    if (this.state.value){
      const newTodoItems = [...this.state.todoItems, this.state.value];

      this.setState({
        value: '',
        todoItems: newTodoItems
      });
      ls.set('value','');
      ls.set('todoItems', newTodoItems);
    }
  }

  deleteTodoItem = (key) => {
    let todoItems = [...this.state.todoItems];
    todoItems.splice(key, 1);
    this.setState({todoItems: todoItems});
    ls.set('todoItems', todoItems);
  }

  renderList = (key) => {
    let listItem = this.state.todoItems[key];
    return(
          <TodoLi key={key}> {listItem} <TodoDelete count={key}  onClick={(event) => this.deleteTodoItem(key)}> &#x2715;</TodoDelete></TodoLi>
    )
  }

  render () {
    return (
      <TodoDiv>
          <TodoUl>
            {Object.keys(this.state.todoItems).map(this.renderList)}
          </TodoUl>
          <TodoHeader>
            <form onSubmit={this.handleSubmit}>
              <TodoInput
                onChange={this.handleChange}
                value={this.state.value}
                type="text"
                placeholder="Write your todos here"
                maxLength="200"
              />
            </form>
          </TodoHeader>
      </TodoDiv>
    )
  }

}

export default Todo;
