const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const path = require('path');

// FIXED: Bulletproof database configuration
let sequelize;

// Check for Railway database URL (Railway provides this)
const DATABASE_URL = process.env.DATABASE_URL || process.env.DATABASE_PRIVATE_URL;

if (DATABASE_URL) {
    console.log('🐘 Using PostgreSQL (Railway)');
    sequelize = new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: process.env.NODE_ENV !== 'production' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    console.log('📦 Using SQLite (Development)');
    const BASE_DIR = path.dirname(__dirname);
    const DB_PATH = path.join(BASE_DIR, 'instance', 'freshers.db');
    
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: DB_PATH,
        logging: false
    });
}

// Models variables
let AdminUser, Event, ScheduleItem, TeamMember, FreshersTitle, TShirtsAndGoodies, GalleryItem, Sponsor, ContactMessage;

function initializeModels() {
    // AdminUser Model
    AdminUser = sequelize.define('AdminUser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(80),
            unique: true,
            allowNull: false
        },
        password_hash: {
            type: DataTypes.STRING(256),
            allowNull: false
        }
    }, {
        tableName: 'admin_users',
        timestamps: false
    });

    AdminUser.prototype.setPassword = function(rawPassword) {
        this.password_hash = bcrypt.hashSync(rawPassword, 10);
    };

    AdminUser.prototype.checkPassword = function(rawPassword) {
        return bcrypt.compareSync(rawPassword, this.password_hash);
    };

    // Event Model
    Event = sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: DataTypes.TEXT,
        date: DataTypes.STRING(100),
        location: DataTypes.STRING(200),
        image_url: DataTypes.STRING(500),
        extra: DataTypes.JSON
    }, {
        tableName: 'events',
        timestamps: false
    });

    // ScheduleItem Model
    ScheduleItem = sequelize.define('ScheduleItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        time: DataTypes.STRING(100),
        title: DataTypes.STRING(200),
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'upcoming'
        },
        extra: DataTypes.JSON
    }, {
        tableName: 'schedule_items',
        timestamps: false
    });

    // TeamMember Model
    TeamMember = sequelize.define('TeamMember', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(150),
        role: DataTypes.STRING(150),
        image_url: DataTypes.STRING(500),
        bio: DataTypes.TEXT
    }, {
        tableName: 'team_members',
        timestamps: false
    });

    // FreshersTitle Model
    FreshersTitle = sequelize.define('FreshersTitle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        winner_name: DataTypes.STRING(200),
        winner_image: DataTypes.STRING(500),
        winner_bio: DataTypes.TEXT,
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'freshers_titles',
        timestamps: false
    });

    // TShirtsAndGoodies Model (NEW)
    TShirtsAndGoodies = sequelize.define('TShirtsAndGoodies', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tshirt_photo_url: DataTypes.STRING(500),
        tshirt_form_url: DataTypes.STRING(500),
        goodies_photo_url: DataTypes.STRING(500)
    }, {
        tableName: 'tshirts_and_goodies',
        timestamps: false
    });

    // GalleryItem Model
    GalleryItem = sequelize.define('GalleryItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        image_url: DataTypes.STRING(500),
        caption: DataTypes.STRING(300)
    }, {
        tableName: 'gallery_items',
        timestamps: false
    });

    // Sponsor Model
    Sponsor = sequelize.define('Sponsor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(200),
        logo_url: DataTypes.STRING(500)
    }, {
        tableName: 'sponsors',
        timestamps: false
    });

    // ContactMessage Model
    ContactMessage = sequelize.define('ContactMessage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(150),
        email: DataTypes.STRING(200),
        message: DataTypes.TEXT
    }, {
        tableName: 'contact_messages',
        timestamps: false
    });

    return {
        AdminUser,
        Event,
        ScheduleItem,
        TeamMember,
        FreshersTitle,
        TShirtsAndGoodies,
        GalleryItem,
        Sponsor,
        ContactMessage
    };
}

module.exports = {
    sequelize,
    initializeModels,
    get AdminUser() { return AdminUser; },
    get Event() { return Event; },
    get ScheduleItem() { return ScheduleItem; },
    get TeamMember() { return TeamMember; },
    get FreshersTitle() { return FreshersTitle; },
    get TShirtsAndGoodies() { return TShirtsAndGoodies; },
    get GalleryItem() { return GalleryItem; },
    get Sponsor() { return Sponsor; },
    get ContactMessage() { return ContactMessage; }
};
