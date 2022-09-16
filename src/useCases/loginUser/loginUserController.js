class LoginUserController {
    #loginUserService;
    constructor(loginUserService) {
        this.#loginUserService = loginUserService;
    }
    async handler(event) {
        try {
            const token = await this.#loginUserService.execute(
                JSON.parse(event.body)
            );
            return {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                    "Access-Control-Allow-Credentials": false,
                },
                statusCode: 200,
                body: JSON.stringify(
                    {
                        token: `Bearer ${token}`,
                        message: "success",
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

module.exports = LoginUserController;
