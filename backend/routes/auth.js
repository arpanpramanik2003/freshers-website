const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');
const router = express.Router();

// Existing login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: 'Username and password required' });
        }
        const models = require('../models');
        const AdminUser = models.AdminUser;
        const admin = await AdminUser.findOne({
            where: { username }
        });
        if (!admin || !admin.checkPassword(password)) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const accessToken = jwt.sign(
            { username: admin.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ access_token: accessToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;
