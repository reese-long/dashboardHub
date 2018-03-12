# IoT-Dashboard

This is an IoT dashboard for collecting and displaying data from sensors using both MQTT and HTTP. User information (address of their 'hub' as well as the devices they wish to connect) is stored on the backend using express/sequelize/posgresql

The browser is configured as an MQTT client, using iot.eclipse.org for MQTT broker services

Door and fire alarm signals are received via MQTT. The switch control panel sends AJAX requests to an express server running on a raspberry pi which is in turn connected to a 2.4GHz radio talking to relays (controlling various electronics) which themselves talk via 2.4GHz radio.

Front end is deigned with react-redux, HTML and CSS.

![an image of the dashboard](https://raw.githubusercontent.com/reese-long/dashboardHub/development/demoPhoto.png)

