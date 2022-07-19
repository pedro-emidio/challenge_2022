class FindUserController {
    #findUserService;
    constructor(findUserService) {
        this.#findUserService = findUserService;
    }
    async handler(event) {
        try {
            console.log(event?.requestContext?.authorizer?.userId);
            const data = await this.#findUserService.execute(event);
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: `${data}`,
                        input: event,
                        data,
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

module.exports = FindUserController;
