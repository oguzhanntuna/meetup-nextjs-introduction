import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.data;

        const client = await MongoClient.connect('mongodb+srv://oguzhantuna:lincoln97@cluster0.efbwc.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        
        const result = await meetupsCollection.insertOne(data);
        
        client.close();

        res.status(201).json({ message: 'Meetup insterted' });
    }
}   

export default handler;