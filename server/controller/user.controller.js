import userServices from "../service/user.service.js";

const userController = {
    getUsers: async (req, res) => {
        try {
            let { search, page, limit, active, inactive } = req.query;

            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;

            search = search || "";

            const users = await userServices.getUsers(search, page, limit, active, inactive);

            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },


    createUser: async (req, res) => {
        try {
            console.log("body", req.body)
            const { firstName, lastName, email, password, address, phone, status } = req.body

            const profile = req.file ? req.file.filename : null

            const user = await userServices.createUser(firstName, lastName, email, password, address, phone, status, profile)

            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userID } = req.params
            const { firstName, lastName, email, password, address, phone, status } = req.body

            const profile = req.file ? req.file.filename : null

            const user = await userServices.updateUser(firstName, lastName, email, password, address, phone, status, profile, userID)

            res.status(200).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userID } = req.params

            const user = await userServices.removeUser(userID)

            res.status(200).json({ message: "User deleted successfully" })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default userController