import axios from 'axios'

const GET_DEVICES = 'GET_DEVICES'
const ADD_DEVICE = 'ADD_DEVICE'
const REMOVE_DEVICE = 'REMOVE_DEVICE'
const UPDATE_DEVICE = 'UPDATE_DEVICE'
/**
 * INITIAL STATE
 */
const initialState = { devices: [] }
/**
 * ACTION CREATORS
 */
const getDevices = (devices) => ({ type: GET_DEVICES, devices })
const updateDevice = (updatedDevice) => ({ type: UPDATE_DEVICE, updatedDevice }) //also used for interacting with switches
const addDevice = (newDevice) => ({ type: ADD_DEVICE, newDevice })
const removeDevice = (device) => ({ type: REMOVE_DEVICE, device })
/**
 * THUNK CREATORS
 */
export const removeDeviceThunk = (userId, device) => dispatch => {
  axios.delete(`/api/devices/${userId}`, device)
    .then(res =>
      dispatch(removeDevice(res.data))
    )
}

export const addDeviceThunk = (userId, newDevice) => dispatch => {
  axios.post(`/api/devices/${userId}`, newDevice)
    .then(res =>
      dispatch(addDevice(res.data))
    )
}

export const fetchDevicesThunk = (userId) => dispatch => {
  axios.get(`/api/devices/${userId}`)
    .then(res =>
      dispatch(getDevices(res.data || [])))
    .catch(err => console.log(err))
}

export const updateDeviceThunk = (deviceId, updatedDevice) => dispatch => {
  axios.put(`/api/devices/${deviceId}`, updatedDevice)
    .then(res => {
      console.log('RES FROM UPDATE THUNK', res.data)
      dispatch(updateDevice(res.data || []))
    })
    .catch(err => console.log(err))
}
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEVICES:
      return action.devices
    case REMOVE_DEVICE:
      return state.filter((device) => device.id !== action.device.id)
    case ADD_DEVICE:
      return [...state, action.newDevice]
    // case UPDATE_DEVICE:
    //   return state.map((device) => {
    //     console.log('yOOOOOOOOOO')
    //    // console.log('OLDSTTEID:', device.id, 'UPDATEDID', action.updatedDevice.id)
    //     return device.id === action.updatedDevice.id ? action.updatedDevice : device
    //   })
    default:
      return state
  }
}
