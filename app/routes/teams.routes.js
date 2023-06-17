module.exports = app => {
    const teams = require('../controllers/teams.controller.js');

    // Create a new team
    app.post('/teams', teams.validate('create'), teams.create);

    // Retrieve all teams
    app.get('/teams', teams.findAll);

    // Retrieve a single team with teamId
    app.get('/teams/:teamId', teams.findOne);

    // Update a team with teamId
    app.put('/teams/:teamId', teams.validate('update'), teams.update);

    // Delete a team with teamId
    app.delete('/teams/:teamId', teams.delete);

    // Delete all teams
    app.delete('/teams', teams.deleteAll);
};