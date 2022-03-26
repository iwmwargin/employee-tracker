const getAllDepts = () => {
    const sqlQuery = " SELECT * FROM depts";
    return db.query(sqlQuery)
}

const addADept = (name) => {
    const sqlQuery = " INSERT INTO depts (name) VALUES (?)";
    return db.query(sqlQuery, [name])
}

module.exports = {getAllDepts, addADept}