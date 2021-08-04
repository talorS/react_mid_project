import { Component } from 'react'
import utils from './usersUtils'
import AddressComp from './AddressData'
import TodosComp from './TodosComp'
import PostsComp from './PostsComp'
import NewUserComp from './newUserComp'
import './myCss.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      todos: [],
      posts: [],
      filter: "",
      newUser: false
    }
  }

  componentDidMount = async () => {
    let usersData = await utils.getAllUsersData();
    let todosData = await utils.getAllUserTodos();
    let postsData = await utils.getAllUserPosts();

    usersData = usersData.map((elm) => {
      return { ...elm, hide: true, color: false };
    });

    this.setState({
      users: usersData,
      todos: todosData,
      posts: postsData
    });
  }

  completeAllTasks(usrID) {
    let userData = this.state.todos.filter(item => item.userId == usrID);
    let tasks = userData.map(item => item.completed);
    return !tasks.includes(false);
  }

  filterUsers = (e) => {
    this.setState({ filter: e.target.value });
  }

  newUserMenu = () => {
    this.setState({ newUser: !this.state.newUser });
  }

  handleSubMenu = (ind) => {
    let arr = this.state.users;
    arr[ind - 1].hide = !this.state.users[ind - 1].hide;
    this.setState({ users: arr });
  }

  updateUser = (ind) => {
    let obj = this.state.users[ind];
  }

  deleteUser = (ind) => {
    let arr = this.state.users;
    arr[ind - 1].name = '';
    arr[ind - 1].email = '';
    arr[ind - 1].address.street = '';
    arr[ind - 1].address.city = '';
    arr[ind - 1].address.zipcode = '';
    this.setState({ users: arr });
  }

  saveName = (ind, e) => {
    let arr = this.state.users;
    arr[ind - 1].name = e.target.value;
    this.setState({ users: arr });
  }

  saveEmail = (ind, e) => {
    let arr = this.state.users;
    arr[ind - 1].email = e.target.value;
    this.setState({ users: arr });
  }

  updateAddress(data, ind) {
    let arr = this.state.users;
    arr[ind - 1].address[data.key] = data.value;
    this.setState({ users: arr });
  }

  updateUserTodo = (data) => {
    let arr = this.state.todos;
    arr[data.id - 1] = data;
    this.setState({ todos: arr });
  }

  addUserTodo = (data) => {
    let arr = this.state.todos;
    let maxTodoId = arr[arr.length - 1].id + 1;
    data["id"] = maxTodoId;
    arr.push(data);
    this.setState({ todos: arr });
  }

  addUserPost = (data) => {
    let arr = this.state.posts;
    let maxPostId = arr[arr.length - 1].id + 1;
    data["id"] = maxPostId;
    arr.push(data);
    this.setState({ posts: arr });
  }

  changeColor = (ind) => {
    let arr = this.state.users;
    arr[ind - 1].color = !this.state.users[ind - 1].color;
    this.setState({ users: arr });
  }

  updateNewUser(data){
    var isTrueSet = (data === 'true');
    this.setState({ newUser: isTrueSet });
  }

  addNewUser(data){
      let arr = this.state.users;
      let len = arr.length;
      let obj = {"id" : arr[len - 1].id + 1,
                "name" : data.name,
                "email" : data.email,
                "address" : {
                  "street": "",
                  "city": "",
                  "zipcode": ""
                  },
                  "hide" : true, 
                  "color" : false
      };
      arr.push(obj);
      this.setState({users : arr});
    }

  render() {

    let filteredUsers = this.state.users.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(this.state.filter.toLowerCase())
      );
    });

    let usersToDisplay = filteredUsers.map((elm) => {
      let colorClass = this.completeAllTasks(elm.id) ? 'GreenBorder' : 'RedBorder';
      colorClass = elm.color ? colorClass + " colorUser" : colorClass;

      let expendUserData = elm.color ? (
        <div className="Center">
          <TodosComp key={'todo' + elm.id} todos={this.state.todos.filter(item => item.userId == elm.id)}
            userId = {elm.id}
            completeCallback={data => this.updateUserTodo(data)}
            newTaskCallback={data => this.addUserTodo(data)} />
          <PostsComp key={'post' + elm.id} posts={this.state.posts.filter(item => item.userId == elm.id)}
            userId = {elm.id}
            newPostCallback={data => this.addUserPost(data)} />
        </div>) : null;

      return <div>
        <div key={elm.id} className={colorClass}>
          <label onClick={() => this.changeColor(elm.id)}> ID : {elm.id} </label> <br />
          <label> Name : </label>
          <input type="textbox" className="Border" value={elm.name} onChange={(e) => this.saveName(elm.id, e)} /><br />
          <label> Email : </label>
          <input type="textbox" className="Border" value={elm.email} onChange={(e) => this.saveEmail(elm.id, e)} /><br />
          <input type="button" value="Other Data" className="ButtonData" onClick={() => this.handleSubMenu(elm.id)} />
          <AddressComp userAddress={elm.address} isHidden={elm.hide}
            addressCallback={data => this.updateAddress(data, elm.id)} />
          <input type="button" value="Update" className="ButtonAction" onClick={() => this.updateUser(elm.id)} />
          <input type="button" value="Delete" className="ButtonAction" onClick={() => this.deleteUser(elm.id)} />
        </div>
        {!this.state.newUser ? expendUserData : null}
      </div>
    });

    return (<div>
      Search: <input type="textbox" value={this.state.filter} className="Border" onChange={this.filterUsers} />
      <input type="button" value="Add" className="ButtonAction" onClick={this.newUserMenu} />
      {usersToDisplay}
      {this.state.newUser ?
          (<div className="right_style">
            <NewUserComp addCallback = {data => this.addNewUser(data)} 
            cancelCallback = {data => this.updateNewUser(data)} />
          </div>
          ) : null
        }
    </div >)
  }
}

export default Menu;
