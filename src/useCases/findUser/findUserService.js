class FindUserService {
    #userRepository;
    constructor(userRepository) {
        this.#userRepository = userRepository;
    }
    async execute(event) {
        const userId = event.queryStringParameters;
        const response = await this.#userRepository.findUserById(userId);
        return response;
    }
}
module.exports = FindUserService;
