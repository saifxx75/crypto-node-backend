const User = require('../store/userStore');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }
    const user = User.find((u) => u.email === email);
    if (!user) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid Password'
        });
    }

    res.json({
        success: true,
        token: signToken(user),
        user: {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
    });
};

module.exports = {
    login,
};