class HelloWorldService{
    #userRepository
    constructor(userRepository){
        // Recebe a classe que faz query no banco (EX: mongoDB, test, postgreSQL)
        this.#userRepository = userRepository
    }
    async execute(){
        console.log("Caiu no Service")
        const response = await this.#userRepository.getAll()
        console.log("Caiu no Service 2" + "\n" + response)

        return response
    }
}
module.exports =  HelloWorldService