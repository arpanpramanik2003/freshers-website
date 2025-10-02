require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { sequelize, initializeModels } = require('./models');

// Config
const BASE_DIR = __dirname;
const UPLOAD_FOLDER = path.join(BASE_DIR, 'uploads');

// Create necessary directories
fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use('/uploads', express.static(UPLOAD_FOLDER));

// Initialize database and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        console.log('🔄 Initializing database models...');
        initializeModels();
        
        // Test database connection
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully');
        
        await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
        console.log('✅ Database synchronized successfully');

        // Import routes AFTER models are initialized
        const authRoutes = require('./routes/auth');
        const publicRoutes = require('./routes/public');
        const adminRoutes = require('./routes/admin');

        // Setup routes
        app.use('/api', authRoutes);
        app.use('/api', publicRoutes);
        app.use('/api/admin', adminRoutes);

        // Health check endpoint
        app.get('/api/health', (req, res) => {
            res.json({
                status: 'ok',
                database: process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });

        // Status endpoint
        app.get('/api/status', (req, res) => {
            res.json({
                status: 'ok',
                uploads: UPLOAD_FOLDER,
                timestamp: new Date().toISOString()
            });
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error('❌ Server Error:', err.stack);
            res.status(500).json({ msg: 'Something went wrong!' });
        });

        // 404 handler
        app.use('*', (req, res) => {
            res.status(404).json({ msg: 'Route not found' });
        });
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`💾 Database: ${process.env.DATABASE_URL ? 'PostgreSQL (Railway)' : 'SQLite (Local)'}`);
            console.log(`📁 Uploads: ${UPLOAD_FOLDER}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('🔄 SIGTERM received, shutting down gracefully');
            server.close(() => {
                console.log('✅ Process terminated');
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
