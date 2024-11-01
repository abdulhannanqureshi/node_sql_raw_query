const { runSQLquery } = require('../../helpers/common.functions.helper');

const createUser = async (data) => {
    console.log("data", data)
    const query = `INSERT INTO users (username, email, password, dob) VALUES ('${data.username}', '${data.email}', '${data.password}', '${new Date(data.dob).toISOString()}')`;
    return await runSQLquery(query);
};

const selectUser = async (id) => {
    const query = `SELECT * FROM users WHERE id = ${id}`;
    return await runSQLquery(query);
};


const isEmailExist = async (email) => {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    return await runSQLquery(query);
};


const selectUserList = async () => {
    const query = `SELECT * FROM users`;
    // const query = `SELECT * FROM users ORDER BY id DESC`;
    // const query = `SELECT * FROM users ORDER BY id DESC LIMIT 3`;
    return await runSQLquery(query);
};

const updateUser = async (id, data) => {
    let query = 'UPDATE users SET '
    let keys = Object.keys(data);
    console.log(keys)
    for (let i = 0; i < keys.length; i++) {
        query += `${keys[i]} = '${data[keys[i]]}' `
        if ((keys.length - 1) !== i) {
            query += `,`;
        }
    }
    query += `WHERE id = ${id}`;
    // `UPDATE users SET username = '${data.username}', email = '${data.email}', password = '${data.password}', dob = '${data.dob}' WHERE id = ${id}`;
    return await runSQLquery(query);
};

const deleteUser = async (id) => {
    const query = `DELETE FROM users WHERE id = ${id}`;
    return await runSQLquery(query);
};


module.exports = {
    createUser,
    selectUser,
    selectUserList,
    updateUser,
    deleteUser,
    isEmailExist
}