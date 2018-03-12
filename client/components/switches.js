import React from 'react'
import { connect } from 'react-redux'
import { addDeviceThunk } from '../store/devices'
import Switch from './test'

/**
 * COMPONENT
 */
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




/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapState = (state) => {
  return { user: state.user, switches: state.sensorData.switches }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(Switches)


