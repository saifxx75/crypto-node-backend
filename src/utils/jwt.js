const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

exports.signToken = (user) => {
    return jwt.sign({
        userId: user.id,
        email: user.email,
        role: user.role,
    },
        SECRET,
        { expiresIn: "24h" }
    );
};
exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};