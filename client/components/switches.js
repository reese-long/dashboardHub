import React from 'react'
import { connect } from 'react-redux'
import { addDeviceThunk } from '../store/devices'
import Switch from './test'

const Switches = (props) => {

  return (

    <div id='switchesFlex'>
    {
      props.switches.map((switchy) =>
        (
          <div className='singleSwitch'>
          <div className = 'statusLabel'>{switchy.name} </div>
          <Switch id = {switchy.id} startingState = {switchy.position}/>
          </div>
        ))
    }
    </div>
  )
}

const mapState = (state) => {
  return { user: state.user, switches: state.sensorData.switches }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(Switches)


