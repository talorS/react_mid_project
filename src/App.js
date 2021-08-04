import logo from './logo.svg';
import './App.css';
import {Component} from 'react'
import Menu from './UsersMenu'

class App extends Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div> 
       <Menu />
      </div>
    )
  }
 }

export default App;
