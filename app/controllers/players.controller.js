const Player = require('../models/players.model.js');
const { body, validationResult } = require('express-validator/check');

// Create and Save a new Player
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
    
    let player = new Player({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        nba_team: req.body.nba_team,
        fantasy_team_id: req.body.fantasy_team_id,
        league_id: req.body.league_id
    });
    

    // Save player in the database
    Player.create(player, (err, data) => {
        if (err) res.status(500).send({message: err.message || 'Some error occurred while creating player.'});
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Player.findById(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found player with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving player with id ` + req.params.playerId
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

    Player.getAll(sort_params, paging_params, filtering_params, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || `Some error occurred while retrieving players.`
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

    Player.updateById(
        parseInt(req.params.playerId),
        new Player(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found player with id ${req.params.playerId}.`
                });
                } else {
                    res.status(500).send({
                        message: "Error updating player with id " + req.params.playerId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Player.remove(req.params.playerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found player with id ${req.params.playerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete player with id " + req.params.playerId
                });
            }
        } else res.send({ message: `Player was deleted successfully!` });
    });
}
