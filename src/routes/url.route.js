const express = require("express");
const createURL = require("../handlers/create.handler");
const Database = require('../../database/connection');
const router = express.Router();


router.get('/create',async (req,res)=>{
    const { url } = req.body;
    const ShortedUrl = createURL(url);

    try{
        const db = await Database();
        const collection = await db.collection('urls');
        const result = await collection.insertOne({ url, urlSlug: ShortedUrl.shortSlug });

        res.json(result)
    } catch(error){
        console.error(error)
    }

})