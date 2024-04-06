const bcrypt = require('bcrypt');

const createPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10)
        return hash
    } catch (error) {
        console.log("error in created password", error.message);
        return error.message
    }

}

const capitalizeFirstLetter = (name) => {
    return name[0].toUpperCase() + name.slice(1);
}

module.exports = { createPassword, capitalizeFirstLetter }