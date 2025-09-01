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

// TEMPORARY PASSWORD RESET - Remove after use
router.post('/emergency-password-reset', async (req, res) => {
    try {
        const { confirmCode, newUsername, newPassword } = req.body;
        
        // Security check - only allow with specific code
        if (confirmCode !== 'reset2025emergency') {
            return res.status(403).json({ msg: 'Invalid confirmation code' });
        }
        
        const models = require('../models');
        const AdminUser = models.AdminUser;
        
        console.log('🚀 Emergency password reset initiated...');
        
        // Delete all existing admins
        const deletedCount = await AdminUser.destroy({ where: {} });
        console.log(`🗑️ Deleted ${deletedCount} existing admin(s)`);
        
        // Create new admin
        const admin = AdminUser.build({ username: newUsername });
        admin.setPassword(newPassword);
        await admin.save();
        
        console.log(`✅ New admin created: ${newUsername}`);
        
        res.json({ 
            success: true, 
            message: `Admin password reset successful. New username: ${newUsername}`,
            deletedCount: deletedCount
        });
    } catch (error) {
        console.error('❌ Password reset error:', error);
        res.status(500).json({ msg: 'Password reset failed', error: error.message });
    }
});

module.exports = router;
