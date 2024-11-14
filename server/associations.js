import Auth from "./model/auth.model.js";
import Package from "./model/package.model.js";
// import User from "./model/user.model.js";

// One To Many relationship between user and package

Package.hasMany(Auth)
Auth.belongsTo(Package)