import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Package = sequelize.define('Package', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    fromDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    toDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});


export default Package