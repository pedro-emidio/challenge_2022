class HelloWorldController{
    #helloWorldService
    constructor(helloWorldService){
        this.#helloWorldService = helloWorldService
    }
    async handler(event){
        console.log("Caiu no controller")
        try {
            const data = await this.#helloWorldService.execute()
            console.log("Caiu no controller 2 " + "\n" + data)

//            const data = await this.#helloWorldService.execute(event.userId)
            console.log(data)
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    message: `${data}`,
                   // input: event,
                   // data
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