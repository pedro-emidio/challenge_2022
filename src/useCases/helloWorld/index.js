const HelloWorldController = require('./helloWorldController')
const HelloWorldService = require('./helloWorldService')

const UserRepository = require('../../data/repositories/userRepository')

let userRepository = new UserRepository()
console.log("Caiu no Index")
const helloWorldService = new HelloWorldService(userRepository)
const helloWorldController = new HelloWorldController(helloWorldService)
console.log("Caiu no Index 2")

module.exports.handler = helloWorldController.handler.bind(helloWorldController)