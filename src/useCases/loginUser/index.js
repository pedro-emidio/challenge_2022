const LoginUserController = require('./loginUserController')
const LoginUserService = require('./loginUserService')

const UserRepository = require('../../data/repositories/userRepository')
let userRepository = new UserRepository()

const loginUserService = new LoginUserService(userRepository)
const loginUserController = new LoginUserController(loginUserService)

module.exports.handler = loginUserController.handler.bind(loginUserController)