import { Component } from 'react'
import './myCss.css';
import NewPostComp from './newPostComp'

class PostsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {newPost : false}
  }

  add = () =>{
    this.setState({newPost : !this.state.newPost});
  }

  setNewPost = (data) =>{
    var isTrueSet = (data === 'true');
    this.setState({ newPost: isTrueSet });
  }

  addNewPost = (data) =>{
    this.props.newPostCallback(data);
  }

  render() {
    let posts = this.props.posts.map(item => {
      return <div key={item.id} className="PurpleBorder">
        <label>Title : {item.title} </label><br />
        <label>Body : {item.body} </label>
      </div>
    });
    return (<div>
      {!this.state.newPost? 
      ( 
        <div className="Border">
      <label >Posts - User {this.props.userId}</label>
      <input type="button" value="Add"
        className="ButtonAction" onClick={() => this.add()} />
      {posts}
      </div>
      ) 
      : 
      <NewPostComp userId={this.props.userId}
      cancelCallback={data => this.setNewPost(data)} 
      addCallback={data => this.addNewPost(data)}/>
      }
    </div>)
  }
}

export default PostsComp;
