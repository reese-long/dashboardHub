const client = new Paho.MQTT.Client("ws://iot.eclipse.org/ws", "myClientId" + new Date().getTime());
const tempFeed = "smartsystem/sensors/temperature";
const humidityFeed = "smartsystem/sensors/humidity";
var fireAlarmFeed = "smartsystem/sensors/fireAlarm"
const doorAlarmFeed = "smartsystem/sensors/doorAlarm"
import axios from 'axios'
const temperatureValues = [];
import { incomingData } from '../../store/sensorData'
import store from '../../store'

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
  console.log("onConnect");
  client.subscribe(tempFeed);
  client.subscribe(humidityFeed);
  client.subscribe(fireAlarmFeed);
  client.subscribe(doorAlarmFeed);
}
//message format: json array with deviceId and status value

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  client.connect({ onSuccess: onConnect });
}
const publish = (dest, msg) => {
  console.log('desint :', dest, 'msggg', msg)
  let message = new Paho.MQTT.Message(msg);
  message.destinationName = dest;
  client.send(message);
}


// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString, 'FROM', message.destinationName);
  switch (message.destinationName) {
    case tempFeed:
      return store.dispatch(incomingData('temp',
        Number(message.payloadString.slice(7))
        , 14))
    case humidityFeed:
      return store.dispatch(incomingData('hum',
        Number(message.payloadString.slice(7))
        , 15))
    case fireAlarmFeed:
      let messageContents = message.payloadString.split('*')
      if(messageContents[0]==='fire'){
        axios.get('/api/alerts/fire')
      }
       store.dispatch(incomingData('fire', messageContents[0], Number(messageContents[1])))
        break;
    case doorAlarmFeed:
      let messageContents2 = message.payloadString.split('*')
      return store.dispatch(incomingData('door',
        messageContents2[0], Number(messageContents2[1])))
  }
}

module.exports = { tempData: temperatureValues, publish }


