module.exports = app => {
    const players = require('../controllers/players.controller.js');

    // Create a new player
    app.post('/players', players.create);
    
    // Retrieve a single player with playerId
    app.get('/players/:playerId', players.findOne);

    // Retrieve all players
    app.get('/players', players.findAll);

    // Update an player with playerId
    app.put('/players/:playerId', players.update);

    // Delete an player with playerId
    app.delete('/players/:playerId', players.delete);

};