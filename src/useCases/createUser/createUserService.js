class CreateUserService{
    #userRepository
    constructor(userRepository){
        this.#userRepository = userRepository
    }
    async execute(event){
        const {name, email, password} = JSON.parse(event.body)
        const passwordEncoded =  Buffer.from(password, "utf-8").toString('base64')

    return await this.#userRepository.createUser({name, email, "password":passwordEncoded})
    }
}
module.exports =  CreateUserService