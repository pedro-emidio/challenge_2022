const HelloWorldController = require('./loginController')
const HelloWorldService = require('./loginService')

const UserRepository = require('../../data/repositories/userRepository')

let userRepository = new UserRepository()

const helloWorldService = new HelloWorldService(userRepository)
const helloWorldController = new HelloWorldController(helloWorldService) 

module.exports.handler = helloWorldController.handler.bind(helloWorldController)