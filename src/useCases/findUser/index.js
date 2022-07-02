const FindUserController = require('./findUserController')
const FindUserService = require('./findUserService')

const UserRepository = require('../../data/repositories/userRepository')
let userRepository = new UserRepository()

const findUserService = new FindUserService(userRepository)
const findUserController = new FindUserController(findUserService)

module.exports.handler = findUserController.handler.bind(findUserController)