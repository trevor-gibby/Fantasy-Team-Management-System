const Team = require("../models/teams.model.js");
const {body, validationResult} = require('express-validator/check');

exports.validate = method => {
    switch (method) {
        case 'create': {
            return [
                body('name', 'Name is required').exists().trim().escape(),
                body('owner_id', 'Owner Id is required').exists().isInt().trim().escape(),
                body('league_id', 'League Id is required').exists().isInt().trim().escape()
            ]
        }
        case 'update': {
            return [
                body('name', 'Name is required').exists().trim().escape(),
                body('owner_id', 'Owner Id is required').exists().isInt().trim().escape(),
                body('league_id', 'League Id is required').exists().isInt().trim().escape()
            ]
        }
    }
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty for team creation!"
        });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }

    // Create a Team
    const team = new Team({
        name: req.body.name,
        owner_id: parseInt(req.body.owner_id),
        league_id: parseInt(req.body.league_id),
        notes: req.body.notes
    });

    // Save Team in the database
    Team.create(team, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Team."
        });
        else res.send(data);
    });
};

// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
    // Check for query string
    let sort_params = null;
    let paging_params = null;
    let filtering_params = null;
    if (req.query.sort_col) sort_params = [req.query.sort_col, req.query.sort_dir];
    if (req.query.limit) paging_params = [req.query.limit, req.query.offset];
    if (req.query.filter_col) filtering_params = [req.query.filter_col, req.query.filter_str];

    Team.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving teams."
            });
        else res.send(data);
    }, sort_params, paging_params, filtering_params);
};

// Retrieve a single team from teh database by ID
exports.findOne = (req, res) => {
    Team.findById(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving team with id ' + req.params.teamId
                });
            }
        } else res.send(data);
    });
}

exports.update = (req, res) => {
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

    Team.updateById(
        parseInt(req.params.teamId),
        new Team(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found Team with id ${req.params.teamId}.`
                    });
                } else {
                    res.status(500).send({
                        message: 'Error updating Customer with id ' + req.params.teamId
                    });
                }
            } else res.send(data);
        }
    );
}

// Delete a Team with a specified teamId in the request
exports.delete = (req, res) => {
    Team.remove(req.params.teamId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Team with id ${req.params.teamId}.`
                });
            } else {
                res.status(500).send({
                    message: 'Could not delete Team with id ' + req.params.teamId
                });
            }
        } else res.send({ message: `Team was deleted successfully`});
    });
}

// Delete all teams from the database
exports.deleteAll = (req, res) => {
    Team.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred while removing all teams.'
            });
        } else res.send({message: `All teams were deleted successfully!`})
    });
}
