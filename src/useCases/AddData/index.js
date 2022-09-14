const UserRepository = require("../../data/repositories/userRepository");
const AddDataController = require("./AddDataController");
const AddDataService = require("./AddDataService");

const userRepository = new UserRepository();
const addDataService = new AddDataService(userRepository);
const addDataController = new AddDataController(addDataService);

module.exports.handler = addDataController.handle.bind(addDataController);
