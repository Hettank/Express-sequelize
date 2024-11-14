import Package from "../model/package.model.js";
import User from "../model/user.model.js";
import Auth from "../model/auth.model.js"

const packageServices = {
    getPackages: async () => {
        try {
            const packages = await Package.findAll({
                include: [{ model: Auth }]
            })

            return packages
        } catch (error) {
            throw new Error("Error getting packages", error)
        }
    },

    createPackage: async (title, description, price, fromDate, toDate) => {
        try {
            const packages = await Package.create({ title, description, price, fromDate, toDate })
            return packages
        } catch (error) {
            throw new Error("Error creating packages", error)
        }
    },

    updatePackage: async (title, description, price, fromDate, toDate, packageId) => {
        try {
            const packages = await Package.findByPk(packageId)

            const updatedPackage = await packages.update({ title, description, price, fromDate, toDate })

            return updatedPackage
        } catch (error) {
            throw new Error("Error updating package", error)
        }
    },

    buyPackage: async (userId, packageId) => {
        try {
            const packages = await Package.findByPk(packageId)
            const auth = await Auth.findByPk(userId)

            console.log("userID", auth)

            if (!packages) {
                throw new Error("Package not found")
            }

            if (!auth) {
                throw new Error("User Not Found")
            }

            // Validation Check
            if (auth.dataValues.PackageId) {
                if (auth.dataValues.PackageId === packageId) {
                    throw new Error("You have bought this package")
                }

                throw new Error("You can't buy other packages since you already have one")
            }

            auth.PackageId = packageId

            await auth.save()

            return { auth, packages }
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default packageServices