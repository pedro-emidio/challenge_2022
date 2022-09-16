const jwt = require("jsonwebtoken");

class LoginUserService {
    #userRepository;
    constructor(userRepository) {
        this.#userRepository = userRepository;
    }
    async execute(userData) {
        const { email, password } = userData;
        const user = await this.#userRepository.findUserByEmail(email);

        if (!user) throw new Error("Not allowed");
        if (Buffer.from(password, "utf-8").toString("base64") !== user.password)
            throw new Error("Not allowed");
        return jwt.sign({ userId: user._id }, process.env.JWS_TOKEN);
    }
}
module.exports = LoginUserService;
