import axios from 'axios'
var moment = require('moment')

const INCOMING_TEMP_HUM = 'INCOMING_TEMP_HUM'
const MAX_DISPLAY = 5
const INCOMING_DOOR = 'INCOMING_DOOR'
const INCOMING_FIRE = 'INCOMING_FIRE'

const GET_SWITCHES = 'GET_SWITCHES'
const GET_FIRE_ALARMS = 'GET_FIRE_ALARMS'
const GET_DOOR_ALARMS = 'GET_DOOR_ALARMS'
const GET_TEMP_HUM_SENSORS = 'GET_TEMP_HUM_SENSORS'

const RESET_ALARM = 'RESET_ALARM'


/**
 * INITIAL STATE
 */
/**
 * ACTION CREATORS
 */

 export const resetAlarm = (alarm) => {
   return {type:RESET_ALARM, alarm}
 }
export const addSensors = (type, collection) => {
  switch (type) {
    case 'switch':
      return ({ type: GET_SWITCHES, switches: collection })
    case 'fire':
      return ({ type: GET_FIRE_ALARMS, fireAlarms: collection })
    case 'door':
      return ({ type: GET_DOOR_ALARMS, doorAlarms: collection })
    case 'tempHum':
      return ({ type: GET_TEMP_HUM_SENSORS, sensors: collection })
  }
}

export const incomingData = (feed, incoming, id) => {
  switch (feed) {
    case 'temp':
      return ({ type: INCOMING_TEMP_HUM, incoming, id })
    case 'hum':
      return ({ type: INCOMING_TEMP_HUM, incoming, id })
    case 'door':
      return ({ type: INCOMING_DOOR, incoming, id })
    case 'fire':
      return ({ type: INCOMING_FIRE, incoming, id })
      case 'switch':
      return ({ type: INCOMING_SWITCH, incoming, id })
  }
}
/**
 * THUNK CREATORS
 */
/**
 * REDUCER
 */
let initial = {
  switches: [],
  tempHum: [],
  door: [], //array of doors
  fire: [] //array of alarms
}



export default function (state = initial, action) {
  switch (action.type) {

    case GET_FIRE_ALARMS:
      return { ...state, fire: action.fireAlarms }
    case GET_TEMP_HUM_SENSORS:
      return { ...state, tempHum: action.sensors }
    case GET_DOOR_ALARMS:
      return { ...state, door: action.doorAlarms }
    case GET_SWITCHES:
      return { ...state, switches: action.switches }
    case INCOMING_TEMP_HUM:
      return {
        ...state,
         tempHum: state.tempHum.map((tempHumSensor) => {
          return !(tempHumSensor.id === action.id) ? tempHumSensor
              : {...tempHumSensor,
                values: [...tempHumSensor.values, action.incoming].slice(-MAX_DISPLAY),
                timestamps: [...tempHumSensor.timestamps, moment().format('h:mm:ss a')].slice(-MAX_DISPLAY)
              }

        })
      }

      case INCOMING_DOOR:
      return{
        ...state,
         door: state.door.map((doorSensor) => {
          return !(doorSensor.id === action.id) ? doorSensor
              : {...doorSensor,
                status: action.incoming,
                timestamp: moment().format('h:mm:ss a')
              }

        })
      }

      case INCOMING_FIRE:
      return{
        ...state,
         fire: state.fire.map((fireSensor) => {
          if(!(fireSensor.id === action.id)) return fireSensor
              else if (fireSensor.status ==='fire'&&action.incoming === 'safe') return {...fireSensor,
                status: 'fire',
                timestamp: fireSensor.timestamp
              }
              else return{...fireSensor,
                status: action.incoming,
                timestamp: moment().format('h:mm:ss a')
              }

        })
      }
        case RESET_ALARM:
        return{
          ...state,
           fire: state.fire.map((fireSensor) => {
            if(!(fireSensor.id === action.alarm.id)) return fireSensor

                else return{...fireSensor,
                  status: 'safe',
                  timestamp: moment().format('h:mm:ss a')
                }

          })
        }
    default:
      return state
  }
}
