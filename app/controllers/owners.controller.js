const Owner = require('../models/owners.model.js');
const { body, validationResult } = require('express-validator/check');

exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('first_name', 'Missing First Name').exists().trim().escape(),
                body('last_name', 'Missing last name').exists().trim().escape(),
                body('phone', 'Invalid phone number').exists().matches(/^[\d]{3}-?[\d]{3}-?[\d]{4}$/).trim().escape(),
                body('email', 'Invalid email').exists().isEmail().trim().escape(),
                body('address1', 'Missing Address').exists().trim().escape(),
                body('city', 'Missing city').exists().trim().escape(),
                body('state', 'Missing state').exists().trim().escape(),
                body('zip', 'Invalid zip code').exists().matches(/^[0-9]{5}$/).trim().escape(),
                body('password', 'Missing password').exists().trim().escape(),
                body('user_name', 'Missing username').exists().trim().escape()
            ]
        }
        case 'update': {
            return [
                body('first_name', 'Missing First Name').exists().trim().escape(),
                body('last_name', 'Missing last name').exists().trim().escape(),
                body('phone', 'Invalid phone number').exists().matches(/^[\d]{3}-?[\d]{3}-?[\d]{4}$/).trim().escape(),
                body('email', 'Invalid email').exists().isEmail().trim().escape(),
                body('address1', 'Missing Address').exists().trim().escape(),
                body('city', 'Missing city').exists().trim().escape(),
                body('state', 'Missing state').exists().trim().escape(),
                body('zip', 'Invalid zip code').exists().matches(/^[0-9]{5}$/).trim().escape(),
                body('password', 'Missing password').exists().trim().escape(),
                body('user_name', 'Missing username').exists().trim().escape()
            ]
        }
    }
}

// Create and Save a new Owner
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }
    
    let owner = new Owner({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        team_id: 1,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        user_name: req.body.user_name
    });
    

    // Save owner in the database
    Owner.create(owner, (err, data) => {
        if (err) res.status(500).send({message: err.message || 'Some error occurred while creating owner.'});
        else res.send(data);
    });
};

exports.findOne = (req, res) => {

    Owner.findById(req.params.ownerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Owner with id ${req.params.ownerId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving Owner with id ` + req.params.ownerId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    // Check for query string
    let sort_params = null;
    let paging_params = null;
    let filtering_params = null;
    if (req.query.sort_col) sort_params = [req.query.sort_col, req.query.sort_dir];
    if (req.query.limit) paging_params = [req.query.limit, req.query.offset];
    if (req.query.filter_col) filtering_params = [req.query.filter_col, req.query.filter_str];

    Owner.getAll(sort_params, paging_params, filtering_params, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving owners.`
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    Owner.updateById(
        parseInt(req.params.ownerId),
        new Owner(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Owner with id ${req.params.ownerId}.`
                });
                } else {
                    res.status(500).send({
                        message: "Error updating Owner with id " + req.params.ownerId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Owner.remove(req.params.ownerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found owner with id ${req.params.ownerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete owner with id " + req.params.ownerId
                });
            }
        } else res.send({ message: `Owner was deleted successfully!` });
    });
}
