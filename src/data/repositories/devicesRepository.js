const db = require('../mongodb')

const {Devices} = require("../../schemas")
class DeviceRepository{
    constructor(){
        this.schemas = db
        /** @type {import("mongoose").default.Model} */
        this.device = Devices
    }
    async createDevice(device){
        try {
            return await this.device.create(device)
        } catch (error) {
            console.log(error)
            return error
        }
    }
}

module.exports =  DeviceRepository