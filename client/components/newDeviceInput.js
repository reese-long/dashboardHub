import React from 'react'
import {connect} from 'react-redux'
import {addDeviceThunk} from '../store/devices'


/**
 * COMPONENT
 */
const NewDevice = (props) => {

  return (
    <div>
      <form onSubmit={(evt)=> {props.handleSubmit(evt, props.user.id)}} name={name}>
        <div>
          <label htmlFor="name"><small>Name</small></label>
          <input name="name" type="text" />
        </div>
        <br/>
        <div>
          <label htmlFor="type"><small>Type</small></label>
          <select name="type" type="text" >
            <option value = 'switch'>two position switch</option>
            <option value = 'door'>door sensor</option>
            <option value = 'fire'>fire alarm</option>
            <option value = 'tempHum'>Temp/Humidity sensor</option>
          </select>
        </div>
        <div>
      </div>
        <div>
          <button type="submit">Add Device</button>
        </div>
      </form>
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
  return {user: state.user}
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt, id) {
      evt.preventDefault()
      const name = evt.target.name.value
      const type = evt.target.type.value
      console.log('INSIDE THE HANDLER', evt.target.type.value, evt.target.name.value,'IDDDD', id)

      dispatch(addDeviceThunk({userId: id, name, type}))
    }
  }
}

export default connect(mapState, mapDispatch)(NewDevice)


