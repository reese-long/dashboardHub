const router = require('express').Router()
const {User, Device} = require('../db/models')
const {sendAlert }= require('./nodemailer')


router.get('/fire', (req, res, next) => {
sendAlert('reese7long@gmail.com','THERES A FIRE','THERE IS SERIOUSLY A FIRE, MAN' )
    console.log('email sent')
    res.send('Sent')
})

module.exports = router



// export const removeDeviceThunk = (userId, device) => dispatch => {
//   axios.delete(`/api/devices/${userId}`, device)
//     .then(res =>
//       dispatch(removeDevice(res.data))
//     )
// }

// export const addDeviceThunk = (userId, newDevice) => dispatch => {
//   axios.post(`/api/devices/${userId}`, newDevice)
//     .then(res =>
//       dispatch(addDevice(res.data))
//     )
// }

// export const fetchDevicesThunk = (userId) => dispatch => {
//   axios.get(`/api/devices/${userId}`)
//     .then(res =>
//       dispatch(getDevices(res.data || [])))
//     .catch(err => console.log(err))
// }

// export const updateDevicesThunk = (userId, deviceId, updatedDevice) => dispatch => {
//   axios.put(`/api/devices/${userId}/${deviceId}`, updatedDevice)
//     .then(res =>
//       dispatch(updateDevice(res.data || [])))
//     .catch(err => console.log(err))
// }
//**
