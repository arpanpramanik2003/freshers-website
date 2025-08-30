require('dotenv').config();
const readline = require('readline');
const { sequelize, initializeModels } = require('../models');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createAdmin() {
    try {
        const models = initializeModels();
        const { AdminUser } = models;
        
        await sequelize.sync();

        rl.question('Enter admin username: ', (username) => {
            if (!username.trim()) {
                console.log('Username required');
                rl.close();
                process.exit(1);
            }

            rl.question('Enter password: ', async (password) => {
                if (!password.trim()) {
                    console.log('Password required');
                    rl.close();
                    process.exit(1);
                }

                try {
                    const existingAdmin = await AdminUser.findOne({
                        where: { username: username.trim() }
                    });

                    if (existingAdmin) {
                        console.log('Admin user already exists');
                        rl.close();
                        process.exit(1);
                    }

                    const admin = AdminUser.build({
                        username: username.trim()
                    });
                    
                    admin.setPassword(password.trim());
                    await admin.save();

                    console.log('✅ Admin user created successfully');
                    rl.close();
                    process.exit(0);
                } catch (error) {
                    console.error('❌ Error creating admin:', error);
                    rl.close();
                    process.exit(1);
                }
            });
        });
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        rl.close();
        process.exit(1);
    }
}

createAdmin();
