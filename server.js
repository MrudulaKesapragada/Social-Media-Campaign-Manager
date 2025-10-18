const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// --- Define Mongoose Schema and Model ---
const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    platform: { type: String, required: true },
    content: { type: String, required: true },
    scheduleDate: { type: Date, required: true }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

// --- Express App Setup ---
const app = express();
const PORT = 3000;
// ❗ IMPORTANT: Replace this with your actual MongoDB connection string
const MONGO_URI = 'mongodb://127.0.0.1:27017/campaignManagerDB';

// --- Database Connection ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---

// GET all campaigns
app.get('/api/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ scheduleDate: 1 });
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new campaign
app.post('/api/campaigns', async (req, res) => {
    const newCampaign = new Campaign({
        name: req.body.name,
        platform: req.body.platform,
        content: req.body.content,
        scheduleDate: req.body.scheduleDate
    });
    try {
        const savedCampaign = await newCampaign.save();
        res.status(201).json(savedCampaign);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a campaign
app.delete('/api/campaigns/:id', async (req, res) => {
    try {
        const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
        if (!deletedCampaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }
        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});