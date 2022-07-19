const db = require("../mongodb");

const { Users } = require("../../schemas");
class UserRepository {
    constructor() {
        this.schemas = db;
        /** @type {import("mongoose").default.Model} */
        this.users = Users;
    }
    async createUser(user) {
        try {
            await db();
            return await this.users.create({ ...user });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteUser(user) {
        try {
            await db();
            const response = await this.users.deleteOne({ _id: user._id });
            if (response.deletedCount === 1) {
                return {
                    statusCode: 200,
                    message: "user deleted",
                    success: true,
                };
            }
            return {
                statusCode: 204,
                message: "User not found",
                success: false,
            };
        } catch (error) {
            return { statusCode: 500, error, success: false };
        }
    }

    async findUserById(user) {
        try {
            await db();
            const response = await this.users.findById(user.id);
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async findUserByEmail(email) {
        try {
            await db();
            return await this.users.findOne({ email });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // }
    // async updateUser(event){
    //     try {
    //         await this.users.create(
    //             {
    //                ...event.user
    //             }
    //         )
    //     } catch (error) {
    //         return error
    //     }

    // }
}
module.exports = UserRepository;
