import axios from 'axios'
import history from '../history'
import { getDevices,  } from './devices'
import { addSensors  } from './sensorData'


/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}
// temperature: {
//   values: [],
//   timestamps: []
// },
// humidity: {
//   values: [],
//   timestamps: []
// },
// // status:'',
//     timestamp: ''

// {
//   name:
//   status:'',
//   timestamp: ''
// }
/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const sortUserDevices = (devices, dispatch) => {
  let fireAlarms = []
  let doorAlarms = []
  let switches = []
  let tempHum = []
  devices.forEach((device) => {
    if (device.type === 'fire') { fireAlarms.push({ name: device.name, timestamp: null, status: device.position, id: device.id }) }
    else if (device.type === 'door') doorAlarms.push(
      { name: device.name, status: device.position, id: device.id, timestamp: null }
    )
    else if (device.type === 'switch') switches.push(
      { name: device.name, position: device.position, id: device.id }

    )
    else if (device.type === 'tempHum') tempHum.push(
      { name: device.name, values:[], timestamps:[], id: device.id })

  })
console.log('GETTTING HERE')
  dispatch(addSensors('switch', switches))
  dispatch(addSensors('fire', fireAlarms))
  dispatch(addSensors('door', doorAlarms))
  dispatch(addSensors('tempHum', tempHum))
}
/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data || defaultUser))
        sortUserDevices(res.data.devices, dispatch)

      })
      .catch(err => console.log(err))

export const auth = (email, password, method, hubAddress) =>
  dispatch => {
    if (hubAddress) {
      axios.post(`/auth/${method}`, { email, password, hubAddress })
        .then(res => {
          dispatch(getUser(res.data))
          sortUserDevices(res.data.devices, dispatch)

          history.push('/home')
        }, authError => { // rare example: a good use case for parallel (non-catch) error handler
          dispatch(getUser({ error: authError }))
        })
        .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
    }
    else {
      axios.post(`/auth/${method}`, { email, password })
        .then(res => {
          dispatch(getUser(res.data))
          console.log('resdata of interest', res.data)
          sortUserDevices(res.data.devices, dispatch)
          history.push('/home')
        }, authError => { // rare example: a good use case for parallel (non-catch) error handler
          dispatch(getUser({ error: authError }))
        })
        .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

    }

  }

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
