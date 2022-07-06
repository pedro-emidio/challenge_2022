class LoginUserController{
    #loginUserService
    constructor(loginUserService){
        this.#loginUserService = loginUserService
    }
    async handler(event){
        try {
            const token = await this.#loginUserService.execute(event.queryStringParameters)
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    token: `Bearer ${token}`,
                    input: event,
                    message: "success"
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

module.exports = LoginUserController