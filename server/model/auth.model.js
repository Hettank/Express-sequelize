import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Auth = sequelize.define('Auth', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

export default Auth