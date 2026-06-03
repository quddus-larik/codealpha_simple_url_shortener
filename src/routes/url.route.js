const express = require("express");
const createURL = require("../handlers/create.handler");
const Database = require('../../database/connection');
const router = express.Router();

router.post('/create', async (req, res) => {
    const url = req.body?.url;
    
    
    if (!url || typeof url !== "string") {
        return res.status(400).json({
            error: "URL is required and must be a string",
            hint: "Send JSON like { \"url\": \"https://example.com\" } with Content-Type: application/json"
        });
    }

    try {
        const shortedUrl = createURL(url);

        if (!shortedUrl.status) {
            return res.status(400).json({ error: shortedUrl.message });
        }

        const db = await Database();
        const collection = await db.collection('urls');
        const result = await collection.insertOne({
            url,
            urlSlug: shortedUrl.shortSlug,
            views: 0
        });

        res.status(201).json({
            success: true,
            data: {
                id: result.insertedId,
                url: url,
                urlSlug: shortedUrl.shortSlug
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create short URL" });
    }
});

router.get('/', async (req, res) => {
    res.json({ message: "working" });
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    try {
        const db = await Database();
        const collection = db.collection('urls');

        const result = await collection.findOneAndUpdate(
            { urlSlug: slug },
            { $inc: { views: 1 } },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        return res.redirect(result.url);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to redirect short URL" });
    }
});

module.exports = router;
