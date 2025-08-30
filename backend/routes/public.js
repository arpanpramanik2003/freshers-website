const express = require('express');

const router = express.Router();

function getModels() {
    const models = require('../models');
    return {
        Event: models.Event,
        ScheduleItem: models.ScheduleItem,
        TeamMember: models.TeamMember,
        FreshersTitle: models.FreshersTitle,
        TShirtsAndGoodies: models.TShirtsAndGoodies,
        GalleryItem: models.GalleryItem,
        Sponsor: models.Sponsor,
        ContactMessage: models.ContactMessage
    };
}

// Get all events
router.get('/events', async (req, res) => {
    try {
        const { Event } = getModels();
        const events = await Event.findAll({
            order: [['id', 'DESC']]
        });
        res.json(events);
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get schedule
router.get('/schedule', async (req, res) => {
    try {
        const { ScheduleItem } = getModels();
        const schedule = await ScheduleItem.findAll({
            order: [['id', 'ASC']]
        });
        res.json(schedule);
    } catch (error) {
        console.error('Get schedule error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get team members
router.get('/team', async (req, res) => {
    try {
        const { TeamMember } = getModels();
        const members = await TeamMember.findAll({
            order: [['id', 'ASC']]
        });
        res.json(members);
    } catch (error) {
        console.error('Get team error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get freshers titles
router.get('/freshers-titles', async (req, res) => {
    try {
        const { FreshersTitle } = getModels();
        const titles = await FreshersTitle.findAll({
            where: { year: 2025 }
        });
        res.json(titles);
    } catch (error) {
        console.error('Get freshers titles error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get T-Shirts and Goodies (NEW ENDPOINT)
router.get('/tshirts-goodies', async (req, res) => {
    try {
        const { TShirtsAndGoodies } = getModels();
        const items = await TShirtsAndGoodies.findOne();
        
        if (items) {
            res.json(items);
        } else {
            res.json({
                id: null,
                tshirt_photo_url: null,
                tshirt_form_url: null,
                goodies_photo_url: null
            });
        }
    } catch (error) {
        console.error('Get tshirts-goodies error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get gallery
router.get('/gallery', async (req, res) => {
    try {
        const { GalleryItem } = getModels();
        const items = await GalleryItem.findAll({
            order: [['id', 'DESC']]
        });
        res.json(items);
    } catch (error) {
        console.error('Get gallery error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Get sponsors
router.get('/sponsors', async (req, res) => {
    try {
        const { Sponsor } = getModels();
        const sponsors = await Sponsor.findAll({
            order: [['id', 'ASC']]
        });
        res.json(sponsors);
    } catch (error) {
        console.error('Get sponsors error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// Submit contact message
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ msg: 'Name, email, and message required' });
        }

        const { ContactMessage } = getModels();
        await ContactMessage.create({
            name,
            email,
            message
        });

        res.status(201).json({ msg: 'Message received' });
    } catch (error) {
        console.error('Submit contact error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;
