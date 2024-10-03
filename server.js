const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.json());

app.post('/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;

    // Simulating image manipulation using an external API (like an image processing service)
    if (file && file.mimetype.startsWith('image/')) {
        const apiUrl = 'https://api.example.com/manipulate'; // Replace with your image manipulation API
        try {
            const response = await axios.post(apiUrl, {
                image: file.buffer.toString('base64'),
            });
            res.json({ success: true, data: response.data });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Image manipulation failed.' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid file type.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
