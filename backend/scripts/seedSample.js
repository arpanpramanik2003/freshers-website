require('dotenv').config();
const { sequelize, initializeModels } = require('../models');

async function seedSample() {
    try {
        const models = initializeModels();
        const { Event, ScheduleItem, TeamMember, TShirtsAndGoodies, GalleryItem, Sponsor } = models;
        
        await sequelize.sync();

        console.log('🗑️ Clearing existing data...');

        await Event.destroy({ where: {} });
        await ScheduleItem.destroy({ where: {} });
        await TeamMember.destroy({ where: {} });
        await TShirtsAndGoodies.destroy({ where: {} });
        await GalleryItem.destroy({ where: {} });
        await Sponsor.destroy({ where: {} });

        console.log('📝 Creating sample data...');

        // Sample events
        const events = await Event.bulkCreate([
            {
                title: "DJ Night",
                description: "Dance to the beats!",
                date: "2025-09-15 19:00",
                location: "Main Lawn",
                image_url: "/images/dj.jpg"
            },
            {
                title: "Talent Hunt",
                description: "Showcase your skills",
                date: "2025-09-15 15:00",
                location: "Auditorium",
                image_url: "/images/talent.jpg"
            },
            {
                title: "Fashion Show",
                description: "Ramp walk",
                date: "2025-09-15 17:00",
                location: "Auditorium",
                image_url: "/images/fashion.jpg"
            }
        ]);

        // Sample schedule
        const schedule = await ScheduleItem.bulkCreate([
            {
                time: "10:00 AM",
                title: "Inauguration",
                status: "done"
            },
            {
                time: "11:30 AM",
                title: "Dance Competition",
                status: "ongoing"
            },
            {
                time: "2:00 PM",
                title: "Skit Performance",
                status: "upcoming"
            }
        ]);

        // Sample team
        const team = await TeamMember.bulkCreate([
            {
                name: "Aarav Mehta",
                role: "President",
                image_url: "/images/core1.jpg"
            },
            {
                name: "Kiara Singh",
                role: "Vice President",
                image_url: "/images/core2.jpg"
            }
        ]);

        // Sample T-shirts & Goodies
        const tshirtsGoodies = await TShirtsAndGoodies.create({
            tshirt_photo_url: "/images/tshirt.jpg",
            tshirt_form_url: "/images/tshirt_form.pdf",
            goodies_photo_url: "/images/goodies.jpg"
        });

        // Sample gallery
        const gallery = await GalleryItem.bulkCreate([
            { image_url: "/images/g1.jpg", caption: "Bollywood Night" },
            { image_url: "/images/g2.jpg", caption: "Cultural Dance" },
            { image_url: "/images/g3.jpg", caption: "Music Performance" },
            { image_url: "/images/g4.jpg", caption: "Group Photo" }
        ]);

        // Sample sponsors
        const sponsors = await Sponsor.bulkCreate([
            { name: "TechNova", logo_url: "/images/s1.png" },
            { name: "Foodiez", logo_url: "/images/s2.png" },
            { name: "StyleHub", logo_url: "/images/s3.png" },
            { name: "MusicBeats", logo_url: "/images/s4.png" }
        ]);

        console.log('✅ Sample data created successfully');
        console.log(`📊 Events: ${events.length}`);
        console.log(`⏰ Schedule items: ${schedule.length}`);
        console.log(`👥 Team members: ${team.length}`);
        console.log(`👕 T-shirts & Goodies: 1`);
        console.log(`🖼️ Gallery items: ${gallery.length}`);
        console.log(`🏢 Sponsors: ${sponsors.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding sample data:', error);
        process.exit(1);
    }
}

seedSample();
