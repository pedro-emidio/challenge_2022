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
            let { deviceId, userId, metrics, insertData } = JSON.parse(
                event.body
            );
            const data = await this.addDataService.execute({
                deviceId,
                userId,
                insertData: insertData ? insertData : new Date(),
                metrics,
            });

            return {
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
