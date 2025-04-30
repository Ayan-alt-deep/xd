
const express = require('express');
const axios = require('axios');
const app = express();
app.get("/", (req, res) => {
  res.send("API by Eren is up and running. Status: Smooth.");
});


const IMGBB_API_KEY = 'your_imgbb_api_key'; // Replace with your key

app.get('/upload', async (req, res) => {
  const imageUrl = req.query.link;
  if (!imageUrl) return res.status(400).json({ status: 'error', message: 'Missing image link' });

  try {
    const result = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { image: imageUrl },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return res.json({
      status: 'success',
      url: result.data.data.url
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: 'error', message: 'Upload failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Eren Upload API running on port ${PORT}`));
