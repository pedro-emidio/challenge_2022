const DeleteteUserController = require('./deleteUserController')
const DeleteUserService = require('./deleteUserService')

const UserRepository = require('../../data/repositories/userRepository')

let userRepository = new UserRepository()
const deleteUserService = new DeleteUserService(userRepository)
const deleteUserController = new DeleteteUserController(deleteUserService)

module.exports.handler = deleteUserController.handler.bind(deleteUserController)