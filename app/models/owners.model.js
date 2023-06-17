const sql = require('./db.js');

const Owner = function(owner) {
    this.first_name = owner.first_name;
    this.last_name = owner.last_name;
    this.address1 = owner.address1;
    this.address2 = owner.address2;
    this.city = owner.city;
    this.state = owner.state;
    this.zip = owner.zip;
    this.team_id = owner.team_id;
    this.email = owner.email;
    this.phone = owner.phone;
    this.password = owner.password;
    this.user_name = owner.user_name;
}

Owner.create = (newOwner, result) => {
    sql.query('INSERT INTO owners SET ?', newOwner, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        console.log(`created owner: `, {id: res.insertId, ...newOwner});
        result(null, {id: res.insertId, ...newOwner});
    });
};

Owner.findById = (ownerId, result) => {
    sql.query(`SELECT * FROM owners WHERE id = ${ownerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(`found owner: `, res[0]);
            result(null, res[0]);
            return;
        }

        // not found owner with the id
        result({ kind: "not_found" }, null);
    });
};

Owner.getAll = (sort_params, paging_params, filtering_params, result) => {
    query_string = `SELECT * FROM owners WHERE 1`;
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
        
            console.log(`Owners: `, res);
            result(null, res);
    });
};

Owner.updateById = (id, owner, result) => {
    sql.query(
        `UPDATE owners SET first_name = ?, last_name = ?, address1 = ?, 
        address2 = ?, city = ?, state = ?, zip = ?, 
        team_id = ?, email = ?, phone = ?, password = ?, 
        user_name = ? WHERE id = ?`,
        [owner.first_name, owner.last_name, owner.address1, owner.address2,
        owner.city, owner.state, owner.zip, owner.team_id,
        owner.email, owner.phone, owner.password, owner.user_name, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            // not found owner with the id
            result({ kind: "not_found" }, null);
            return;
        }
    
        console.log(`updated owner: `, { id: id, ...owner });
        result(null, { id: id, ...owner });
        }
    );
};

Owner.remove = (id, result) => {
    sql.query("DELETE FROM owners WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
    
        if (res.affectedRows == 0) {
            // not found owner with the id
            result({ kind: "not_found" }, null);
            return;
        }
    
        console.log("deleted owner with id: ", id);
        result(null, res);
    });
};

module.exports = Owner;
