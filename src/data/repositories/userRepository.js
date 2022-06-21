const db = require('../mongodb')

class UserRepository{
    constructor(){
        this.schemas = db
    }
    async getAll(event){
        return this.schemas.user.findAll
    }
}
module.exports =  UserRepository