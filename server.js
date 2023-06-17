const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');

const app = express();

// Include cors module
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Create connection to view and imgs directories
app.use(express.static('view'));

// index.html route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/index.html'));
});

// Add routes
require('./app/routes/teams.routes.js')(app);
require('./app/routes/owners.routes.js')(app);
require('./app/routes/players.routes.js')(app);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
