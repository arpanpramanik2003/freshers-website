const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'change-this-secret';

const adminRequired = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No token provided' });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const models = require('../models');
        const AdminUser = models.AdminUser;
        
        const admin = await AdminUser.findOne({
            where: { username: decoded.username }
        });

        if (!admin) {
            return res.status(401).json({ msg: 'Admin privileges required' });
        }

        req.user = { username: admin.username };
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = {
    adminRequired,
    JWT_SECRET
};
