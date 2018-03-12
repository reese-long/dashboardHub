import React, { Component } from "react";
import { connect } from 'react-redux'
import Switch from "react-switch";
import { updateDeviceThunk } from '../store/devices'


class Switchy extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.startingState === 'on' ? true : false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked, user, deviceId, updatedDevice, pos) {

    this.props.handleSwitch(user, deviceId, updatedDevice, pos)
    this.setState({ checked });
  }


  render() {
    let pos = !this.state.checked ? 'on' : 'off'
    return (

      <Switch className={pos === 'off' ? 'sliderSwitch' : 'sliderSwitch on'}
        checked={this.state.checked}
        onChange={(evt) => this.handleChange(evt, this.props.user, this.props.id, { position: pos }, pos)}
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              fontSize: 15,
              color: "orange",
              paddingRight: 2
            }}
          >
            Off
      </div>
        }
        checkedIcon={
          <svg viewBox="0 0 10 10" height="100%" width="100%" fill="aqua">
            <circle r={3} cx={5} cy={5} />
          </svg>
        }
        className="react-switch"
        id="icon-switch"
      />
    );
  }
}

const mapState = (state) => {
  return { user: state.user }
}

const mapDispatch = dispatch => {
  return {
    handleSwitch(user, deviceId, updatedDevice, pos) {
      console.log('user', user, 'deviceid', deviceId, 'updated', updatedDevice, 'pos', pos)
      dispatch(updateDeviceThunk(user, deviceId, updatedDevice, pos))
    }
  }
}

export default connect(mapState, mapDispatch)(Switchy)


