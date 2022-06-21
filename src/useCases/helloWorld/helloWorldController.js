class HelloWorldController{
    #helloWorldService
    constructor(helloWorldService){
        this.#helloWorldService = helloWorldService
    }
    async handler(event){
        try {
            const data = await this.#helloWorldService.execute(event.userId)
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    message: "message success",
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
                        message: "message fail",
                    },
                  null,
                  2
                ),
            };
        }
    }
}

module.exports = HelloWorldController