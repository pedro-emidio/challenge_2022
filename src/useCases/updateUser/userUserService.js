class CreateUserService{
    #userRepository
    constructor(userRepository){
        this.#userRepository = userRepository
    }
    async execute(event){
        // const response = await this.#userRepository.createUser(event)
        return event
    }
}
module.exports =  CreateUserService