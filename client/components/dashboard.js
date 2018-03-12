import React from 'react'
import { connect } from 'react-redux'
import NewDevice from './newDeviceInput'
import { tempData } from './MQTT/connection'
import Switch from './test'
import ColorPicker from './colorPicker'
import FireAlarms from './fireAlarms'
import DoorAlarms from './doorAlarms'
import Switches from './Switches'
import { publish } from './MQTT/connection'
import Chart from './chart'

const mqtt = require('./MQTT/connection.js')

const tempChartOptions = {
  scaleBeginAtZero: true,

  title: {

    display: true,
    text: 'Temperature and Humidity Data',

    scales: {
      yAxes: [{

        stacked: false,
        ticks: {
          min: 0,
          stepSize: 1,
        }

      }],
      xAxes: [{
        type: 'time',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5
        }
      }]
    }
  }
}

const humChartOptions = {
  scaleBeginAtZero: true,

  title: {
    display: true,
    text: 'Temperature and Humidity Data'
  },
  scales: {

    yAxes: [{
      display: true,
      ticks: {
        min: 0,
        max: 100,
        steps: 10,
        stepValue: 5,
        beginAtZero: true   // minimum value will be 0.
      }
    }],
    xAxes: [{
      type: 'time',
      ticks: {
        min: 0,
        max: 100,
        steps: 10,
        stepValue: 5,
        beginAtZero: true   // minimum value will be 0.
      }
    }]
  }
}

const Dashboard = (props) => {
  const tempChartData = {
    labels: props.temperatureData.timestamps,
    datasets: [
      {
        data: props.temperatureData.values,
        borderColor: "#3e95cd",
        label: "Temperature",
        fillColor: ["rgba(0,10,220,0.5)"],
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,.6)",
        xAxisID: 'Temperature'
      },
    ]
  }

  const humChartData = {
    labels: props.humidityData.timestamps,
    datasets: [
      {
        data: props.humidityData.values,
        borderColor: "#3e95cd",
        label: "Temperature",
        fillColor: ["rgba(110,0,0,0.5)"],
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,.6)",
        xAxisID: 'Humidity'
      }
    ]
  }

  let mockTestBoolean = false;
  return (


    <div id='mainContainer'>

      <br />
      <button id="sendMock" onClick={() => {
        mockTestBoolean = !mockTestBoolean
        if (boolean) {
          publish("smartsystem/sensors/mockAlarm", "1")
        }

        else {
          publish("smartsystem/sensors/mockAlarm", "0")
        }

      }}></button>
      <div id='dataStreams'>
        <div id='chartFlex' >
          <div className='chartTitle'>Temperature (F)</div>
          <Chart className='chart' data={tempChartData} options={tempChartOptions} />
          <br />
          <div className='chartTitle'>Humidity (%)</div>
          <Chart className='chart' data={humChartData} options={humChartOptions} />
        </div>
        <DoorAlarms />
        <FireAlarms />
        <Switches />
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    devices: state.devices,
    user: state.user,
    temperatureData: state.sensorData.tempHum[0],
    humidityData: state.sensorData.tempHum[1]
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(Dashboard)

/**
 * PROP TYPES
 */
