const sql = require('./db.js');

const Player = function(player) {
    this.first_name = player.first_name;
    this.last_name = player.last_name;
    this.nba_team = player.nba_team;
    this.fantasy_team_id = player.fantasy_team_id;
    this.league_id = player.league_id;
}

Player.create = (newPlayer, result) => {
    sql.query('INSERT INTO players SET ?', newPlayer, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log(`created player: `, {id: res.insertId, ...newPlayer});
        result(null, {id: res.insertId, ...newPlayer});
    });
};

Player.findById = (playerId, result) => {
    sql.query(`SELECT * FROM players WHERE id = ${playerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found player: `, res[0]);
            result(null, res[0]);
            return;
        }

        // not found player with the id
        result({ kind: "not_found" }, null);
    });
};

Player.getAll = (sort_params, paging_params, filtering_params, result) => {
    query_string = `SELECT * FROM players WHERE 1`;
    // Check for filtering
    if (filtering_params != null) {
        let filter_col = filtering_params[0];
        let filter_str = filtering_params[1];
        query_string = `${query_string} AND ${filter_col} LIKE '%${filter_str}%'`;
    }
    // Check for sorting parameters
    if (sort_params != null) {
        let sort_col = sort_params[0];
        let sort_dir = sort_params[1];
        if (sort_dir == 'asc') sort_dir = 'ASC';
        if (sort_dir == 'dsc') sort_dir = 'DESC';
        query_string = `${query_string} ORDER BY ${sort_col} ${sort_dir}`;
    }
    // Check for paging
    if (paging_params != null) {
        let limit = paging_params[0];
        let offset = paging_params[1];
        query_string = `${query_string} LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    }

    sql.query(query_string,
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
            }
        
            console.log(`Players: `, res);
            result(null, res);
    });
};

Player.updateById = (id, player, result) => {
    sql.query(
        `UPDATE players SET first_name = ?, last_name = ?, nba_team = ?, 
        fantasy_team_id = ?, league_id = ? WHERE id = ?`,
        [player.first_name, player.last_name, player.nba_team, player.fantasy_team_id,
        player.league_id, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            // not found player with the id
            result({ kind: "not_found" }, null);
            return;
        }
    
        console.log(`updated player: `, { id: id, ...player });
        result(null, { id: id, ...player });
        }
    );
};

Player.remove = (id, result) => {
    sql.query("DELETE FROM players WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            // not found player with the id
            result({ kind: "not_found" }, null);
            return;
        }
    
        console.log("deleted player with id: ", id);
        result(null, res);
    });
};

module.exports = Player;
