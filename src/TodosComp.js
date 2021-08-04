import { Component } from 'react'
import './myCss.css';
import NewTodoComp from './newTodoComp'

class TodosComp extends Component {
  constructor(props) {
    super(props);
    this.state = {newTodo : false}
  }

  complete = (ind) => {
    this.props.todos[ind].completed = true;
    this.props.completeCallback(this.props.todos[ind]);
  }

  add = () =>{
    this.setState({newTodo : !this.state.newTodo});
  }

  setNewTodo = (data) =>{
    var isTrueSet = (data === 'true');
    this.setState({ newTodo: isTrueSet });
  }

  addNewTodo = (data) =>{
    this.props.newTaskCallback(data);
  }

  render() { 
    let tasks = this.props.todos.map((item,i) => {
      let mark = !item.completed ? (<input type="button" value="Mark Completed"
        className="ButtonAction" onClick={() => this.complete(i)} />) : null;
      return <div key={i} className="PurpleBorder">
        <label >Title : {item.title} </label><br />
        <label>Completed : {item.completed.toString()} </label>
        {mark}
      </div>
    });
    return (<div>
      {!this.state.newTodo? 
      ( 
        <div className="Border">
        <label >Todos - User {this.props.userId} </label>
        <input type="button" value="Add"
          className="ButtonAction" onClick={() => this.add()} />
        {tasks}
        </div>
      ) 
      : 
      <NewTodoComp userId={this.props.userId}
      cancelCallback={data => this.setNewTodo(data)} 
      addCallback={data => this.addNewTodo(data)}/>
      }
    </div>)
  }
}

export default TodosComp;
