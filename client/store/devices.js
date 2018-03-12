import axios from 'axios'

const GET_DEVICES = 'GET_DEVICES'
const ADD_DEVICE = 'ADD_DEVICE'
const REMOVE_DEVICE = 'REMOVE_DEVICE'
const UPDATE_DEVICE = 'UPDATE_DEVICE'
/**
 * INITIAL STATE
 */
/**
 * ACTION CREATORS
 */
export const getDevices = (devices) => ({ type: GET_DEVICES, devices })
const updateDevice = (updatedDevice) => ({ type: UPDATE_DEVICE, updatedDevice }) //also used for interacting with switches
const addDevice = (newDevice) => ({ type: ADD_DEVICE, newDevice })
const removeDevice = (device) => ({ type: REMOVE_DEVICE, device })


/**
 * THUNK CREATORS
 */
export const removeDeviceThunk = (userId, device) => dispatch => {
  axios.delete(`/api/devices/`, device)
    .then(res =>
      dispatch(removeDevice(res.data))
    )
}

export const addDeviceThunk = (newDevice) => dispatch => {
  axios.post(`/api/devices`, newDevice)
    .then(res => {
      console.log('res is post thunk', res.data)
      dispatch(addDevice(res.data))
    }
    )
}

const sendToHub = (user, id, onOrOff)=> {
  onOrOff === 'on'?
  axios.get(`http://${user.hubAddress}:3000/9`)

  :
  axios.get(`http://${user.hubAddress}:3000/10`)

  //axios.get(`${user.hubAddress}/devices/${device.id}/${device.position}`)
 //172.16.22.121
}

export const updateDeviceThunk = (user, deviceId, updatedDevice,onOrOff) => dispatch => {
  axios.put(`/api/devices/${deviceId}`, updatedDevice)
    .then(res => {
      dispatch(updateDevice(res.data || []))
     sendToHub(user,deviceId, onOrOff)
    })
    .catch(err => console.log(err))
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_DEVICES:
      return action.devices
    case REMOVE_DEVICE:
      return state.filter((device) => device.id !== action.device.id)
    case ADD_DEVICE:
      return [...state, action.newDevice]
    case UPDATE_DEVICE:
      return state.map((device) => {
        console.log('yOOOOOOOOOO')
        // console.log('OLDSTTEID:', device.id, 'UPDATEDID', action.updatedDevice.id)
        return device.id === action.updatedDevice.id ? action.updatedDevice : device
      })
    //   })
    default:
      return state
  }
}
