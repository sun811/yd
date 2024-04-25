const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ytdl = require('ytdl-core');

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/download', (req, res) => {
    const url = req.body.url;
    if (url) {
        ytdl.getInfo(url, (err, info) => {
            if (err) {
                res.status(500).send({ error: 'An error occurred. Please try again later.' });
            } else {
                const videoUrl = info.formats[0].url;
                res.send({ videoUrl });
            }
        });
    } else {
        res.status(400).send({ error: 'Invalid URL' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});