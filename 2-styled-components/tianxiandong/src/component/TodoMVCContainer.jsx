import React, { Component } from 'react';
import styled from 'styled-components';

//界面
const TodoMVC = (props) => {
  return (
    <div className={props.className}>
      <div className="todoapp">
        <header>
          <h1>todos</h1>
          <input type="text" className="new-todo" placeholder="What needs to be done?" value={props.inputText}
            onChange={(e) => {
              console.log(e.currentTarget.value)
              props.changeInputText(e.currentTarget.value)
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                props.addTodo()
              }
            }}
          />
        </header>
        <section className="main">
          {
            props.todoList.length > 0 ?
              <input className="toggle-all" type="checkbox"
                checked={props.todoList.filter(e => e.status === 'completed').length === props.todoList.length}
                onChange={(e) => {
                  console.log(e.target.checked)
                  props.changeAllStatus(e.target.checked)
                }}
              />
              : null
          }

          <ul className="todo-list">
            {/*列表*/}
            {
              props.todoList.map((todo) => {
                let isShow = props.range === todo.status ? true : (props.range === 'all' ? true : false);
                return (
                  !isShow ? null :
                    <li className={todo.status === 'completed' ? 'completed' : ''} key={props.todoList.indexOf(todo)}>
                      <div>
                        <input className="toggle" type="checkbox" checked={todo.status === 'completed'} onChange={() => {
                          props.changeTodo(props.todoList.indexOf(todo))
                        }} />
                        <label>{todo.name}</label>
                        <button className="destroy" onClick={() => {
                          props.deleteTodo(props.todoList.indexOf(todo))
                        }}></button>
                      </div>
                    </li>
                )
              })
            }
            {/*列表*/}
          </ul>
        </section>

        {
          props.todoList.length === 0 ? null :
            <footer className="footer">
              <span className="todo-count">
                <strong>{props.todoList.filter(e => e.status === 'active').length}</strong>
                <span> </span>
                <span>items</span>
                <span> left</span>
              </span>
              <ul className="filters">
                <li><a className={props.range === 'all' ? 'selected' : ''} onClick={() => { props.changeRange('all') }}>All</a></li><span> </span>
                <li><a className={props.range === 'active' ? 'selected' : ''} onClick={() => { props.changeRange('active') }}>Active</a></li><span> </span>
                <li><a className={props.range === 'completed' ? 'selected' : ''} onClick={() => { props.changeRange('completed') }}>Completed</a></li>
              </ul>
              {
                props.todoList.filter(e => e.status === 'completed').length === 0 ? null :
                  <button className="clear-completed"
                    onClick={() => {
                      props.clearCompleted()
                    }}
                  >Clear completed</button>
              }
            </footer>
        }
      </div>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://github.com/petehunt/">petehunt</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  )
}

const StyledTodoMVC = styled(TodoMVC) `
    .todoapp {
      background: #fff;
      margin: 130px 0 40px 0;
      position: relative;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                  0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    .todoapp input::-webkit-input-placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }

    .todoapp input::-moz-placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }

    .todoapp input::input-placeholder {
      font-style: italic;
      font-weight: 300;
      color: #e6e6e6;
    }

    .todoapp h1 {
      position: absolute;
      top: -155px;
      width: 100%;
      font-size: 100px;
      font-weight: 100;
      text-align: center;
      color: rgba(175, 47, 47, 0.15);
      -webkit-text-rendering: optimizeLegibility;
      -moz-text-rendering: optimizeLegibility;
      text-rendering: optimizeLegibility;
    }

    .new-todo,
    .edit {
      position: relative;
      margin: 0;
      width: 100%;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      border: 0;
      outline: none;
      color: inherit;
      padding: 6px;
      border: 1px solid #999;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      font-smoothing: antialiased;
    }

    .new-todo {
      padding: 16px 16px 16px 60px;
      border: none;
      background: rgba(0, 0, 0, 0.003);
      box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }

    .main {
      position: relative;
      z-index: 2;
      border-top: 1px solid #e6e6e6;
    }

    .toggle-all {
      position: absolute;
      top: -55px;
      left: -12px;
      width: 60px;
      height: 34px;
      text-align: center;
      border: none; /* Mobile Safari */
    }

    .toggle-all:before {
      content: '❯';
      font-size: 22px;
      color: #e6e6e6;
      padding: 10px 27px 10px 27px;
    }

    .toggle-all:checked:before {
      color: #737373;
    }

    .todo-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .todo-list li {
      position: relative;
      font-size: 24px;
      border-bottom: 1px solid #ededed;
    }

    .todo-list li:last-child {
      border-bottom: none;
    }

    .todo-list li.editing {
      border-bottom: none;
      padding: 0;
    }

    .todo-list li.editing .edit {
      display: block;
      width: 506px;
      padding: 13px 17px 12px 17px;
      margin: 0 0 0 43px;
    }

    .todo-list li.editing .view {
      display: none;
    }

    .todo-list li .toggle {
      text-align: center;
      width: 40px;
      /* auto, since non-WebKit browsers doesn't support input styling */
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      border: none; /* Mobile Safari */
      -webkit-appearance: none;
      appearance: none;
    }

    .todo-list li .toggle:after {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    .todo-list li .toggle:checked:after {
      content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    .todo-list li label {
      white-space: pre-line;
      word-break: break-all;
      padding: 15px 60px 15px 15px;
      margin-left: 45px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
    }

    .todo-list li.completed label {
      color: #d9d9d9;
      text-decoration: line-through;
    }

    .todo-list li .destroy {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      width: 40px;
      height: 40px;
      margin: auto 0;
      font-size: 30px;
      color: #cc9a9a;
      margin-bottom: 11px;
      transition: color 0.2s ease-out;
    }

    .todo-list li .destroy:hover {
      color: #af5b5e;
    }

    .todo-list li .destroy:after {
      content: '×';
    }

    .todo-list li:hover .destroy {
      display: block;
    }

    .todo-list li .edit {
      display: none;
    }

    .todo-list li.editing:last-child {
      margin-bottom: -1px;
    }

    .footer {
      color: #777;
      padding: 10px 15px;
      height: 20px;
      text-align: center;
      border-top: 1px solid #e6e6e6;
    }

    .footer:before {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50px;
      overflow: hidden;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                  0 8px 0 -3px #f6f6f6,
                  0 9px 1px -3px rgba(0, 0, 0, 0.2),
                  0 16px 0 -6px #f6f6f6,
                  0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }

    .todo-count {
      float: left;
      text-align: left;
    }

    .todo-count strong {
      font-weight: 300;
    }

    .filters {
      margin: 0;
      padding: 0;
      list-style: none;
      position: absolute;
      right: 0;
      left: 0;
    }

    .filters li {
      display: inline;
    }

    .filters li a {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
      cursor:pointer;
    }

    .filters li a.selected,
    .filters li a:hover {
      border-color: rgba(175, 47, 47, 0.1);
    }

    .filters li a.selected {
      border-color: rgba(175, 47, 47, 0.2);
    }

    .clear-completed,
    html .clear-completed:active {
      float: right;
      position: relative;
      line-height: 20px;
      text-decoration: none;
      cursor: pointer;
      position: relative;
    }

    .clear-completed:hover {
      text-decoration: underline;
    }

    .info {
      margin: 65px auto 0;
      color: #bfbfbf;
      font-size: 10px;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
      text-align: center;
    }

    .info p {
      line-height: 1;
    }

    .info a {
      color: inherit;
      text-decoration: none;
      font-weight: 400;
    }

    .info a:hover {
      text-decoration: underline;
    }

    @media screen and (-webkit-min-device-pixel-ratio:0) {
      .toggle-all,
      .todo-list li .toggle {
        background: none;
      }

      .todo-list li .toggle {
        height: 40px;
      }

      .toggle-all {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
        -webkit-appearance: none;
        appearance: none;
      }
    }
`

//逻辑
class TodoMVCContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      range: 'all',  // all:全部  active:未完成  completed:完成
      inputText: '',//输入框内容
    }
  }

  //修改输入框内容
  changeInputText = (text) => {
    this.setState({
      inputText: text
    })
  }

  //添加
  addTodo = () => {
    if (this.state.inputText === '') {
      return;
    }
    //name:名字  state:状态 active:未完成  completed:完成
    this.state.todoList.unshift({
      name: this.state.inputText,
      status: 'active'
    })
    console.log(this.state.todoList);
    this.setState({
      todoList: this.state.todoList,
      inputText: ''
    })
  }

  //删除
  deleteTodo = (index) => {
    this.state.todoList.splice(index, 1)
    this.setState({
      todoList: this.state.todoList
    })
  }

  //修改任务状态
  changeTodo = (index) => {
    let todo = this.state.todoList[index];
    if (todo.status === 'active') {
      todo.status = 'completed'
    } else {
      todo.status = 'active'
    }
    this.setState({
      todoList: this.state.todoList
    })
  }

  //修改范围状态
  changeRange = (range) => {
    this.setState({
      range: range
    })
  }

  //完成所有任务
  changeAllStatus = (checkboxStatus) => {
    let status = 'active';
    if (checkboxStatus) {  //如果全选框选中，则表示全部完成
      status = 'completed';
    }
    for (let todo of this.state.todoList) {
      todo.status = status;
    }
    this.setState({
      todoList: this.state.todoList
    })
  }

  //清除所有完成的任务
  clearCompleted = () => {
    this.setState({
      todoList: this.state.todoList.filter(e => e.status === 'active')
    })
  }

  render() {
    return (
      <StyledTodoMVC
        todoList={this.state.todoList}
        range={this.state.range}
        inputText={this.state.inputText}
        changeInputText={(text) => this.changeInputText(text)}
        addTodo={() => this.addTodo()}
        deleteTodo={(index) => this.deleteTodo(index)}
        changeTodo={(index) => this.changeTodo(index)}
        changeRange={(range) => this.changeRange(range)}
        changeAllStatus={(checkboxStatus) => this.changeAllStatus(checkboxStatus)}
        clearCompleted={() => this.clearCompleted()}
      />
    )
  }
}

export default TodoMVCContainer;
