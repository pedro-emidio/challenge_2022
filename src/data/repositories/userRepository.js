const db = require('../mongodb')

const {Users} = require("../../schemas/users")
const {InsertRecord} = require("../../schemas/insertRecords")

class UserRepository{
    constructor(){
        this.schemas = db
        /** @type {import("mongoose").default.Model} */
        this.users = Users
    }
    async getAll(event){
        const connection = await db()
        const xpto  =  await this.users.find()
        console.log("AQUI: ", xpto)
        return xpto
    }
}
module.exports =  UserRepository