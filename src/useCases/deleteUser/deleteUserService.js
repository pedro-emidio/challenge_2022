class DeleteUserService{
    #userRepository
    constructor(userRepository){
        this.#userRepository = userRepository
    }
    async execute(event){
        return await this.#userRepository.deleteUser(event)
    }
}
module.exports =  DeleteUserService