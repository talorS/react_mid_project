import { Component } from 'react'
import './myCss.css';

class NewPostComp extends Component {
  constructor(props) {
    super(props);
    this.state = {title : '',
                  body : ''  
                }
  }
  
  setTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  setBody = (e) => {
    this.setState({ body: e.target.value });
  }

  cancel = () => {
    this.props.cancelCallback('false');
  }

  add = () => {
    let obj = {
               "userId": this.props.userId,
               "title" : this.state.title,
               "body" : this.state.body
              };
    this.props.addCallback(obj);
  }

  render() {
    return (
    <div className="Border">
      <label >New Post - User {this.props.userId} </label> <br />
      Title: <input type="textbox" className="Border" onChange={this.setTitle} /><br/>
      Body: <input type="textbox" className="Border" onChange={this.setBody} /><br/>
      <input type="button" value="Cancel" className="ButtonAction" onClick={() => this.cancel()} />
      <input type="button" value="Add" className="ButtonAction" onClick={() => this.add()} />
    </div>)
  }
}

export default NewPostComp;
