import React, {Component} from 'react'
//import tempChart from './MQTT/tempHumChart'
var mqtt = require('mqtt')
var CanvasJS = require('canvasjs');

class TempChart extends Component {
  constructor(props){
     super(props)
  
  }
  
  componentDidMount(){
var Tcount = 0;
var Hcount = 0;
var tempDPS = []; // dataPoints
var humidityDPS = [];
var chart = new CanvasJS.Chart("chartContainer", {
	backgroundColor: "#3E6873",
 	animationEnabled: true,
	zoomEnabled: true,
// 	title :{
// 		text: "Temperature & Humidity",
// 		fontColor: "White",
//      	fontSize: 30,
// //     borderThickness:5
// 		},
	axisX:{
		valueFormatString:"hh:mm:ss TT",
		interval:1,
		labelFontSize:16,
		labelFontColor:"Black"
		},
	axisY: {
		minimum:10,
		maximum: 120,
		interval:10,
		suffix: " °F",
		labelFontSize:20,
		includeZero: false,
		labelFontColor:"Black"
		},
	legend:{
		cursor: "pointer",
		fontSize: 24,	
		},
	toolTip:{
		cornerRadius: 4
		},
	data: [
	{
		name: "Temperature",
		showInLegend: true,
		lineThickness:6,
  		markerColor: "Black",
		olor:"Red",
		type: "spline",
		dataPoints: tempDPS
	},
	{
		name: "Humidity",
		showInLegend: true,
		lineThickness:6,
    	markerColor: "Black",
		color:"Orange",
		type: "spline",
		dataPoints: humidityDPS
	}]
});
var xVal = 0;
var yVal = 100; 
var updateInterval = 1000;
var dataLength = 80; // number of dataPoints visible at any point
// var updateChart = function (count) {
	
// 	if (tempDPS.length > dataLength) {
// 		tempDPS.shift();
// 	}
// 	if (humidityDPS.length > dataLength) {
// 		humidityDPS.shift();
// 	}
// 	chart.render();
// };
// 	chart.render()
  
// updateChart(dataLength);
// setInterval(function(){updateChart(dataLength)}, updateInterval);
// var client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "/ws");
// var tempFeed = "smartsystem/sensors/temperature";
// var humidityFeed= "smartsystem/sensors/humidity";
// client.onConnectionLost = onConnectionLost;
// client.onMessageArrived = onMessageArrived;
// // connect the client
// client.connect({onSuccess:onConnect});
// // called when the client connects
// function onConnect() {
//   // Once a connection has been made, make a subscription and send a message.
//   console.log("onConnect");
//   client.subscribe(tempFeed);
//   client.subscribe(humidityFeed)
  //message = new Paho.MQTT.Message("Hello");
  //message.destinationName = "World";
 // client.send(message);
 chart.render()
}
// called when the client loses its connection
// function onConnectionLost(responseObject) {
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost:"+responseObject.errorMessage);
//   }
// }
// // called when a message arrives
// function onMessageArrived(message) {
// 	console.log("INT: ", message.payloadString.slice(6));
// 	console.log(message.destinationName);
// 	if(message.destinationName === tempFeed){
// 	tempDPS.push({x:new Date,y:Number(message.payloadString.slice(7))});
//   Tcount++;
// }
// else{
// 	humidityDPS.push({x:new Date,y:Number(message.payloadString.slice(7))});
// 	//console.log('DPS: ' , dps)
//   Hcount++;
// }
// }
  
  render() {
    return(
    <div id = 'chartContainer'/>

    )
}
}
export default TempChart
//}