import React from 'react'
import {connect} from 'react-redux'
import TwoPosSwitch from './twoPosSwitch'

const Dashboard = (props) => (
  <div id = 'mainContainer'>
{
  props.devices?
  props.devices.map((device) => <TwoPosSwitch key = {device.id} device = {device} />):
  ''
}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    devices: state.user.devices,
    user:state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Dashboard)

/**
 * PROP TYPES
 */
