const sql = require('./db.js');

const Team = function(team) {
    this.name = team.name,
    this.owner_id = team.owner_id,
    this.league_id = team.league_id,
    this.notes = team.notes
};

Team.create = (newTeam, result) => {
    sql.query('INSERT INTO teams SET ?', newTeam, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log('Created team: ', {id: res.insertId, ...newTeam });
        result(null, {id: res.insertId, ...newTeam});
    });
};

Team.getAll = (result, sort_params = null, paging_params = null, filtering_params = null) => {
    let query_string = 'SELECT * FROM teams';
    // Check for filtering
    if (filtering_params != null) {
        let filter_col = filtering_params[0];
        let filter_str = filtering_params[1];
        query_string = `${query_string} WHERE ${filter_col} LIKE '%${filter_str}%'`;
    }
    // Check for sorting
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

    sql.query(query_string, (err, res) => {
        if (err) {
            console.log('Error: ', err);
            result(null, err);
            return
        }

        console.log('Teams: ', res);
        result(null, res);
    });
};

Team.findById = (teamId, result) => {
    sql.query(`SELECT * FROM teams WHERE id = ${teamId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found team: ', res[0])
            result(null, res[0]);
            return;
        }
        // Team not found with ID
        result({kind: 'not_found'}, null);
    })
};

Team.updateById = (id, team, result) => {
    sql.query(
        "UPDATE teams SET name = ?, owner_id = ?, league_id = ?, notes = ? WHERE id = ?",
        [team.name, team.owner_id, team.league_id, team.notes, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // Not found team with ID
                result({kind: 'not_found'}, null);
                return;
            }

            console.log('updated customer: ', {id: id, ...team });
            result(null, { id: id, ...team });
        }
    );
};

Team.remove = (id, result) => {
    sql.query('DELETE FROM teams WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: 'not_found'}, null);
            return;
        }

        console.log('deleted team with id: ', id);
        result(null, res);
    });
};

Team.removeAll = result => {
    sql.query('DELETE FROM teams', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} teams`);
        result(null, res);
    });
};

module.exports = Team;
