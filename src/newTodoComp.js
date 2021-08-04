import { Component } from 'react'
import './myCss.css';

class NewTodoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {title : '',
                  completed : false  
                }
  }
  
  setTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  setCompleted = (e) => {
    var isTrueSet = (e.target.value === 'true');
    this.setState({ completed: isTrueSet });
  }

  cancel = () => {
    this.props.cancelCallback('false');
  }

  add = () => {
    let obj = {
               "userId": this.props.userId,
               "title" : this.state.title,
               "completed" : this.state.completed
              };
    this.props.addCallback(obj);
  }

  render() {
    return (
    <div className="Border">
      <label >New Todo - User {this.props.userId} </label> <br />
      Title: <input type="textbox" className="Border" onChange={this.setTitle} /><br/>
      Completed: <input type="textbox" className="Border" onChange={this.setCompleted} /><br/>
      <input type="button" value="Cancel" className="ButtonAction" onClick={() => this.cancel()} />
      <input type="button" value="Add" className="ButtonAction" onClick={() => this.add()} />
    </div>)
  }
}

export default NewTodoComp;
