const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Example of a simple route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/cubes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'colorCube/colorCube.html'));
});
app.get('/snake', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'snake/snake.html'));
});
app.get('/is_ready', (req, res) => {
    res.status(200).send('Service is ready');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

