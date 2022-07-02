const CreateUserController = require('./updateUserController')
const CreateUserService = require('./userUserService')

const UserRepository = require('../../data/repositories/userRepository')

let userRepository = new UserRepository()
const createUserService = new CreateUserService(userRepository)
const createUserController = new CreateUserController(createUserService)

module.exports.handler = createUserController.handler.bind(createUserController)