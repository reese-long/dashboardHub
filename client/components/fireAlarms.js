import React from 'react'
import { connect } from 'react-redux'
import { addDeviceThunk } from '../store/devices'
import {resetAlarm} from '../store/sensorData'


/**
 * COMPONENT
 */
const FireAlarms = (props) => {
  return (
    <div id='fireFlex'>
      {
        props.alarms.map((alarm) =>
          (
            <div className='singleAlarm' style = {alarm.status === 'safe' || alarm.status === 'null' ? {} : {boxShadow: '0 0 1vw .3vw red', }}>
              <div className='statusLabel'>{alarm.name}</div>
              <img className='fireImg' src={alarm.status === 'safe' || alarm.status === 'null' ? '/fireAlarmGreen.png' : '/fireAlarmRed.png'} style={alarm.status === 'safe' || alarm.status === 'null' ? {} : { boxShadow: '0 0 1vw .5vw red', backgroundColor: 'red' }} />
              <div className='statusLabel minor'>{alarm.status !== 'null' ? `status: ${alarm.status}` : ''}</div>
              {
                alarm.status === 'fire' ?
                  (
                    <div align='center'>
                      <div className='statusLabel minor'>Triggered: {alarm.timestamp}</div>
                      <button className='resetFireAlarm' onClick= {()=>{props.handleReset(alarm)}}>reset</button>
                    </div>
                  )
                  :
                  <div className='statusLabel minor'>{alarm.timestamp ? `Last update: ${alarm.timestamp}` : 'not connected'}</div>

              }
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
  return { user: state.user, alarms: state.sensorData.fire }
}

const mapDispatch = (dispatch) => {
  return {
    handleReset:(whichAlarm)=>{
      dispatch(resetAlarm(whichAlarm))
    }

  }
}

export default connect(mapState, mapDispatch)(FireAlarms)


