require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { sequelize, initializeModels } = require('./models');

// Config
const BASE_DIR = __dirname;
const DB_PATH = path.join(BASE_DIR, 'instance', 'freshers.db');
const UPLOAD_FOLDER = path.join(BASE_DIR, 'uploads');

// Create necessary directories
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.FRONTEND_URL]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(UPLOAD_FOLDER));

// Initialize database and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        // Initialize models FIRST
        console.log('Initializing database models...');
        initializeModels();
        await sequelize.sync();
        console.log('Database synchronized successfully');

        // Import routes AFTER models are initialized
        const authRoutes = require('./routes/auth');
        const publicRoutes = require('./routes/public');
        const adminRoutes = require('./routes/admin');

        // Setup routes
        app.use('/api', authRoutes);
        app.use('/api', publicRoutes);
        app.use('/api/admin', adminRoutes);

        // Status endpoint
        app.get('/api/status', (req, res) => {
            res.json({
                status: 'ok',
                db: DB_PATH,
                uploads: UPLOAD_FOLDER,
                timestamp: new Date().toISOString()
            });
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ msg: 'Something went wrong!' });
        });

        // 404 handler
        app.use('*', (req, res) => {
            res.status(404).json({ msg: 'Route not found' });
        });
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`💾 Database: ${DB_PATH}`);
            console.log(`📁 Uploads: ${UPLOAD_FOLDER}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
