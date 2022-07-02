class CreateUserController{
    #createUserService
    constructor(createUserService){
        this.#createUserService = createUserService
    }
    async handler(event){
        try {
            const data = await this.#createUserService.execute(event)
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

module.exports = CreateUserController