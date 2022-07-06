const CreateDeviceController = require('./createDeviceController')
const CreateDeviceService = require('./createDeviceService')

const DeviceRepository = require('../../../data/repositories/devicesRepository')

let devicesRepository = new DeviceRepository()
const createDeviceService = new CreateDeviceService(devicesRepository)
const createDeviceController = new CreateDeviceController(createDeviceService)

module.exports.handler = createDeviceController.handler.bind(createDeviceController)