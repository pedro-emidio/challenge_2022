module.exports = class AddDataService {
    constructor(userRepository) {
        /**
         * @type {import("../../data/repositories/userRepository").default}
         */
        this.userRepository = userRepository;
    }

    async execute({ deviceId, userId, insertData, metrics }) {
        const data = await this.userRepository.addData({
            deviceId,
            userId,
            insertData,
            metrics,
        });
        return data;
    }
};
