import { Op } from "sequelize";
import User from "../model/user.model.js";

const userServices = {
    getUsers: async (search, page, limit, active, inactive, order) => {
        try {
            const conditions = {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${search}%` } },
                    { lastName: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                ]
            }

            if (active === "true" && inactive === 'false') {
                conditions.status = true
            } else if (active === 'false' && inactive === 'true') {
                conditions.status = false
            }

            const offset = (page - 1) * limit

            const fetchedUsers = await User.findAndCountAll({
                limit: limit,
                offset: offset,
                where: conditions,
                order: [['createdAt', order]]
            })

            return fetchedUsers
        } catch (error) {
            console.log(error)
            throw new Error("Error getting users")
        }
    },

    createUser: async (firstName, lastName, email, password, address, phone, status, profile) => {
        console.log(firstName)
        try {
            const user = await User.create({ firstName, lastName, email, password, address, phone, status, profilePic: profile })

            return user
        } catch (error) {
            throw new Error(error)
        }
    },

    updateUser: async (firstName, lastName, email, password, address, phone, status, profile, userID) => {
        try {
            const user = await User.findByPk(userID)

            if (!user) {
                throw new Error("User not found")
            }

            const updatedUser = await user.update({ firstName, lastName, email, password, address, phone, status, profilePic: profile })

            return updatedUser
        } catch (error) {
            throw new Error(error)
        }
    },

    removeUser: async (userID) => {
        try {
            const user = await User.findByPk(userID)

            if (!user) {
                throw new Error("User not found")
            }

            await user.destroy()

            return user
        } catch (error) {
            throw new Error("Error updating user")
        }
    }
}

export default userServices