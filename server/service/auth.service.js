import Auth from "../model/auth.model.js";

const authServices = {
    getUsers: async () => {
        try {
            const users = await Auth.findAll()
            return users
        } catch (error) {
            throw new Error("Error getting registered users");
        }
    },

    register: async (username, email, password) => {
        try {
            const userExists = await Auth.findOne({ where: { email } });

            if (userExists) {
                throw new Error("User already exists with this email");
            }

            const user = await Auth.create({ username, email, password });
            return user;
        } catch (error) {
            throw new Error("Registration Error");
        }
    },

    login: async (email, password) => {
        try {
            const userExist = await Auth.findOne({ where: { email } });

            if (!userExist) {
                throw new Error("User not found");
            }

            if (password !== userExist.password) {
                throw new Error("Invalid credentials");
            }

            return userExist;
        } catch (error) {
            throw new Error("Login Error");
        }
    }
};

export default authServices;