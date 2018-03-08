import React from 'react'
import { connect } from 'react-redux'
import { updateDeviceThunk } from '../store/devices'

const TwoPosSwitch = (props) => (
  <div className="TwoPosContainer">
    <button className="lightOn" onClick={() => props.handleClick(props.device.id, { position: 'on' })}>TURN {props.device.name} ON</button>
    <button className="lightOff" onClick={() => props.handleClick(props.device.id, { position: 'off' })}>TURN {props.device.name} OFF</button>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id

  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(deviceId, updatedDevice) {
      dispatch(updateDeviceThunk(deviceId, updatedDevice))
    }
  }
}

export default connect(mapState, mapDispatch)(TwoPosSwitch)

