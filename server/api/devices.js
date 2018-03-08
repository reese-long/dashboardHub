const router = require('express').Router()
const {User, Device} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Device.findAll({
  where: {userId: req.params.id}
  })
    .then(userDevices => res.json(userDevices))
    .catch(next)
})
router.put('/:id', (req, res, next) => {
	Device.update(req.body, {
		where: { id: req.params.id },
		returning: true
	})
		.then((results) => {
			let updated = results[1][0]
			res.json(updated)
		})
		.catch(next)
})



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
