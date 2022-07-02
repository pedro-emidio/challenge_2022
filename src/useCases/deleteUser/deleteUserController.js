class DeleteUserController{
    #deleteUserService
    constructor(deleteUserService){
        this.#deleteUserService = deleteUserService
    }
    async handler(event){
        try {
            const data = await this.#deleteUserService.execute(event.queryStringParameters)
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    message: `${data.user}`,
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

module.exports = DeleteUserController