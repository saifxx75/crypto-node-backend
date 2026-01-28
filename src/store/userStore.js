const bcrypt = require('bcrypt');

module.exports = [
    {
        id: 1,
        email: "admin@example.com",
        password: bcrypt.hashSync('admin123', 10),
        role: 'ADMIN'
    },
    {
        id: "2",
        email: "user@example.com",
        password: bcrypt.hashSync("user123", 10),
        role: "USER",
    },
];