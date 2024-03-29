class CreateDeviceController{
    #createDeviceService
    constructor(createDeviceService){
        this.#createDeviceService = createDeviceService
    }
    async handler(event){
        try {
            const data = await this.#createDeviceService.execute(event)
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    message: `success`,
                    input: event,
                    data
                  },
                  null,
                  2
                ),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(
                    {
                        message: "fail",
                    },
                  null,
                  2
                ),
            };
        }
    }
}

module.exports = CreateDeviceController