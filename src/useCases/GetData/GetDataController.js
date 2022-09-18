module.exports = class AddDataController {
    constructor(addDataService) {
        this.addDataService = addDataService;
    }

    async handle(event, context) {
        /**
         * This method context.callbackWaitsForEmptyEventLoop = false;
         * Remove await response for Sequelize in loopback.
         * Do not remove.
         */
        context.callbackWaitsForEmptyEventLoop = false;

        try {
            const { userId, deviceId, dateFilter } =
                event.queryStringParameters;
            const data = await this.addDataService.execute(
                userId,
                deviceId,
                dateFilter
            );

            return {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,GET",
                    "Access-Control-Allow-Credentials": false,
                },
                statusCode: 200,
                body: JSON.stringify({
                    data,
                    message: "Success",
                    error: {},
                }),
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
