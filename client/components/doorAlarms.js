import React from 'react'
import { connect } from 'react-redux'
import { addDeviceThunk } from '../store/devices'

const DoorAlarms = (props) => {

  return (

    <div id='doorFlex'>
      {
        props.alarms.map((alarm) =>
          (
            <div className='singleAlarm doorAlarm'>
              <div className='statusLabel'>{alarm.name} door</div>
              <img className='doorImg' src={alarm.status === 'open' ? '/doorOpen.png' : '/doorClosed.png'} />
              <div className='statusLabel minor'>{alarm.timestamp ? `Last update: ${alarm.timestamp}` : 'not connected'}</div>
            </div>
          ))
      }
    </div>
  )
}

const mapState = (state) => {
  return { user: state.user, alarms: state.sensorData.door }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(DoorAlarms)


