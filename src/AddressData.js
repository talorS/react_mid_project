import { Component } from 'react'
import './myCss.css';

class AddressComp extends Component {
  constructor(props) {
    super(props);
  }

  sendData = (e, key) => {
    this.props.addressCallback({ 'key': key, 'value': e.target.value });
  }

  render() {
    let data = !this.props.isHidden ?
      Object.entries(this.props.userAddress).filter((item) => (item[0] === 'street' || item[0] === 'city' || item[0] === 'zipcode'))
        .map(([key, value], ind) => {
          return <div key={ind}>
            <label>{key} : </label> <input type="textbox" className="Border" value={value.toString()}
              onChange={(e) => this.sendData(e, key)} />
          </div>
        }) : null;

    if (data != null) {
      data = (<div className="adrs">{data}</div>);
    }

    return (<div>
      {data}
    </div>)
  }
}

export default AddressComp;
