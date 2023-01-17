const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const rootPath = (path.join(__dirname, 'dist'));
const source = 'index.html'

// Listen on port 3000
app.listen(PORT, function() {
    console.log(`App on port ${PORT}`)
})

// Serving static files
app.use(express.static(rootPath));

app.use('/', (req, res) => {
    res.sendFile((path.join(rootPath, source)))
});

