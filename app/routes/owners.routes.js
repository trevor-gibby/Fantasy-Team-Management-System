module.exports = app => {
    const owners = require('../controllers/owners.controller.js');

    // Create a new owner
    app.post('/owners', owners.validate('create'), owners.create);
    
    // Retrieve a single owner with ownerId
    app.get('/owners/:ownerId', owners.findOne);

    // Retrieve all owners
    app.get('/owners', owners.findAll);

    // Update an owner with ownerId
    app.put('/owners/:ownerId', owners.validate('update'), owners.update);

    // Delete an owner with ownerId
    app.delete('/owners/:ownerId', owners.delete);

};