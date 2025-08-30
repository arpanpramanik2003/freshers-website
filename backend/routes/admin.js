const express = require('express');
const multer = require('multer');
const path = require('path');
const { adminRequired } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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

// File upload endpoint
router.post('/upload', adminRequired, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    res.json({ 
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`
    });
});

// Contact Messages
router.get('/contact-messages', adminRequired, async (req, res) => {
    try {
        const { ContactMessage } = getModels();
        const messages = await ContactMessage.findAll({
            order: [['id', 'DESC']]
        });
        res.json(messages);
    } catch (error) {
        console.error('Get contact messages error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


// EVENTS CRUD
router.post('/events', adminRequired, async (req, res) => {
    try {
        const { Event } = getModels();
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/events/:id', adminRequired, async (req, res) => {
    try {
        const { Event } = getModels();
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        await event.update(req.body);
        res.json(event);
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/events/:id', adminRequired, async (req, res) => {
    try {
        const { Event } = getModels();
        const deleted = await Event.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json({ msg: 'Event deleted' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// SCHEDULE CRUD
router.post('/schedule', adminRequired, async (req, res) => {
    try {
        const { ScheduleItem } = getModels();
        const item = await ScheduleItem.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        console.error('Create schedule error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/schedule/:id', adminRequired, async (req, res) => {
    try {
        const { ScheduleItem } = getModels();
        const item = await ScheduleItem.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Schedule item not found' });
        }
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        console.error('Update schedule error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/schedule/:id', adminRequired, async (req, res) => {
    try {
        const { ScheduleItem } = getModels();
        const deleted = await ScheduleItem.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Schedule item not found' });
        }
        res.json({ msg: 'Schedule item deleted' });
    } catch (error) {
        console.error('Delete schedule error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// TEAM CRUD
router.post('/team', adminRequired, async (req, res) => {
    try {
        const { TeamMember } = getModels();
        const member = await TeamMember.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        console.error('Create team member error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/team/:id', adminRequired, async (req, res) => {
    try {
        const { TeamMember } = getModels();
        const member = await TeamMember.findByPk(req.params.id);
        if (!member) {
            return res.status(404).json({ msg: 'Team member not found' });
        }
        await member.update(req.body);
        res.json(member);
    } catch (error) {
        console.error('Update team member error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/team/:id', adminRequired, async (req, res) => {
    try {
        const { TeamMember } = getModels();
        const deleted = await TeamMember.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Team member not found' });
        }
        res.json({ msg: 'Team member deleted' });
    } catch (error) {
        console.error('Delete team member error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// GALLERY CRUD
router.post('/gallery', adminRequired, async (req, res) => {
    try {
        const { GalleryItem } = getModels();
        const item = await GalleryItem.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        console.error('Create gallery item error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/gallery/:id', adminRequired, async (req, res) => {
    try {
        const { GalleryItem } = getModels();
        const item = await GalleryItem.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Gallery item not found' });
        }
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        console.error('Update gallery item error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/gallery/:id', adminRequired, async (req, res) => {
    try {
        const { GalleryItem } = getModels();
        const deleted = await GalleryItem.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Gallery item not found' });
        }
        res.json({ msg: 'Gallery item deleted' });
    } catch (error) {
        console.error('Delete gallery item error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// FRESHERS TITLES CRUD
router.post('/freshers-titles', adminRequired, async (req, res) => {
    try {
        const { FreshersTitle } = getModels();
        const title = await FreshersTitle.create(req.body);
        res.status(201).json(title);
    } catch (error) {
        console.error('Create freshers title error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/freshers-titles/:id', adminRequired, async (req, res) => {
    try {
        const { FreshersTitle } = getModels();
        const title = await FreshersTitle.findByPk(req.params.id);
        if (!title) {
            return res.status(404).json({ msg: 'Freshers title not found' });
        }
        await title.update(req.body);
        res.json(title);
    } catch (error) {
        console.error('Update freshers title error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/freshers-titles/:id', adminRequired, async (req, res) => {
    try {
        const { FreshersTitle } = getModels();
        const deleted = await FreshersTitle.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Freshers title not found' });
        }
        res.json({ msg: 'Freshers title deleted' });
    } catch (error) {
        console.error('Delete freshers title error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// T-SHIRTS AND GOODIES CRUD (NEW)
router.post('/tshirts-goodies', adminRequired, async (req, res) => {
    try {
        const { TShirtsAndGoodies } = getModels();
        
        const existing = await TShirtsAndGoodies.findOne();
        if (existing) {
            return res.status(400).json({ msg: 'Record already exists, use PUT to update' });
        }
        
        const item = await TShirtsAndGoodies.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        console.error('Create tshirts-goodies error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/tshirts-goodies/:id', adminRequired, async (req, res) => {
    try {
        const { TShirtsAndGoodies } = getModels();
        const item = await TShirtsAndGoodies.findByPk(req.params.id);
        
        if (!item) {
            return res.status(404).json({ msg: 'T-shirts and goodies not found' });
        }
        
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        console.error('Update tshirts-goodies error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/tshirts-goodies', adminRequired, async (req, res) => {
    try {
        const { TShirtsAndGoodies } = getModels();
        
        let item = await TShirtsAndGoodies.findOne();
        if (item) {
            await item.update(req.body);
        } else {
            item = await TShirtsAndGoodies.create(req.body);
        }
        
        res.json(item);
    } catch (error) {
        console.error('Update/create tshirts-goodies error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

// SPONSORS CRUD
router.post('/sponsors', adminRequired, async (req, res) => {
    try {
        const { Sponsor } = getModels();
        const sponsor = await Sponsor.create(req.body);
        res.status(201).json(sponsor);
    } catch (error) {
        console.error('Create sponsor error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.put('/sponsors/:id', adminRequired, async (req, res) => {
    try {
        const { Sponsor } = getModels();
        const sponsor = await Sponsor.findByPk(req.params.id);
        if (!sponsor) {
            return res.status(404).json({ msg: 'Sponsor not found' });
        }
        await sponsor.update(req.body);
        res.json(sponsor);
    } catch (error) {
        console.error('Update sponsor error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

router.delete('/sponsors/:id', adminRequired, async (req, res) => {
    try {
        const { Sponsor } = getModels();
        const deleted = await Sponsor.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ msg: 'Sponsor not found' });
        }
        res.json({ msg: 'Sponsor deleted' });
    } catch (error) {
        console.error('Delete sponsor error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;
