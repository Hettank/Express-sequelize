import authServices from "../service/auth.service.js";

const authController = {
    getUsers: async (req, res) => {
        try {
            const users = await authServices.getUsers()
            res.status(200).json({ users })
        } catch (error) {

        }
    },

    register: async (req, res) => {
        try {
            const { username, email, password } = req.body

            const user = await authServices.register(username, email, password)

            res.status(201).json({ message: "Registration Successful" })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await authServices.login(email, password)

            res.status(200).json({ user, message: "Login Successful" })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

export default authController