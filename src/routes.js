const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const UserController = require('./app/controller/userController')
const SessionController = require('./app/controller/sessionController')
const DashboardController = require('./app/controller/dashboardController')
const FileController = require('./app/controller/fileController')
const AppointmentController = require('./app/controller/appointmentController')
const AvailableController = require('./app/controller/availableController')
const ScheduleController = require('./app/controller/scheduleController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/files/:file', FileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/userDashboard', DashboardController.userIndex)
routes.get('/app/providerDashboard', DashboardController.providerIndex)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)
routes.get('/app/available/:provider', AvailableController.index)
routes.get('/app/schedule/', ScheduleController.index)

module.exports = routes
