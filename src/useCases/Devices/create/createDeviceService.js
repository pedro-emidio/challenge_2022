class CreateDeviceService{
    #devicesRepository
    constructor(devicesRepository){
        this.#devicesRepository = devicesRepository
    }
    async execute(event){
        const device = JSON.parse(event.body)
        return await this.#devicesRepository.createDevice(device)
    }
}
module.exports =  CreateDeviceService