const md5 = require("md5");

const hashPassword = password => {
    return md5(password + "fgc");
}

const comparePassword = (password, hashedPassword) => {
    return hashPassword(password) === hashedPassword;
};

module.exports = {
    hashPassword,
    comparePassword,
};
