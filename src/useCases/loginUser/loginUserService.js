const jwt = require("jsonwebtoken");

class LoginUserService {
    #userRepository;
    constructor(userRepository) {
        this.#userRepository = userRepository;
    }
    async execute(userData) {
        const { email, password } = userData;
        const user = await this.#userRepository.findUserByEmail(email);

        if (!user) return "User not exists";
        if (Buffer.from(password, "utf-8").toString("base64") !== user.password)
            return "username or password is invalid";
        return jwt.sign({ userId: user._id }, process.env.JWS_TOKEN);
    }
}
module.exports = LoginUserService;