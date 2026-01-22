const express = require('express');
const cors = require('cors');
const { activeUserGraphData } = require('./controllers/whatsapp_analytics');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

// getting port from environmental variables or defaulting to 3000
const PORT = process.env.PORT || 3000;

/**
 * Route to get active WhatsApp users graph data
 */
app.get('/api/whatsapp/active-users', async (req, res) => {
    try {
        const data = await activeUserGraphData();   
        return res.status(200).json(data);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

