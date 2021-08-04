import { Component } from 'react'
import './myCss.css';

class NewUserComp extends Component {
  constructor(props) {
    super(props);
    this.state = {name : '',
                  email : ''  
                }
  }
  
  setName = (e) => {
    this.setState({ name: e.target.value });
  }

  setEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  cancel = () => {
    this.props.cancelCallback('false');
  }

  add = () => {
    let obj = {
               "name" : this.state.name,
               "email" : this.state.email
              };
    this.props.addCallback(obj);
  }

  render() {
    return (
    <div className="Border">
      <label >Add New User </label> <br />
      Name: <input type="textbox" className="Border" onChange={this.setName} /><br/>
      Email: <input type="textbox" className="Border" onChange={this.setEmail} /><br/>
      <input type="button" value="Cancel" className="ButtonAction" onClick={() => this.cancel()} />
      <input type="button" value="Add" className="ButtonAction" onClick={() => this.add()} />
    </div>)
  }
}

export default NewUserComp;
