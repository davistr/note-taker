// Import Express.js
const express = require('express');

// Import routes
const apiRoutes = require('./develop/routes/apiRoutes');
const htmlRoutes = require('./develop/routes/htmlRoutes');

// Initialize the app
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});