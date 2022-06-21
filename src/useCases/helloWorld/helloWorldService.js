class HelloWorldService{
    #userRepository
    constructor(userRepository){
        // Recebe a classe que faz query no banco (EX: mongoDB, test, postgreSQL)
        this.#userRepository = userRepository
    }
    async execute(userId){
        const response = this.#userRepository.findUserById(userId)
        return response
    }
}
module.exports =  HelloWorldService