const pool = require("../../config/database");

module.exports = {
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log('results', results)
                return callBack(null, results[0]);
            }
        );
    },
    create: (data, callBack) => {
        pool.query(
            `insert into users(first_name, last_name, gender, email, password, mobile_no) 
                values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserId: (id, callBack) => {
        pool.query(
            `Select * from users where id = ? `,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id,email,first_name,last_name,gender,email,mobile_no from users`,
            [],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update users set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserDetails: (id, callBack) => {
        pool.query("SELECT * FROM users WHERE id = ?", [id], (err, rows, fields) => {
            if (!err) {
                pool.query("SELECT * FROM experience", [], (errTarn, rowsTarn, fieldsTarn) => {
                    if (!errTarn) {
                        pool.query("SELECT * FROM education", [], (errEdu, rowsEdu, fieldsEdu) => {
                            if (errEdu) {
                                callBack(errEdu);
                            }
                            let results = {
                                message: "Statement",
                                userData: rows[0],
                                experience: rowsTarn,
                                education: rowsEdu
                            };
                            return callBack(null, results);
                        })
                    } else {
                        callBack(errTarn)
                    }
                });
            } else {
                callBack(err)
            }
        });
    },

    updateResumeName: (data, callBack) => {
        pool.query(`update users set name=? where id = ?`,
            [data.name, data.id],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateResumeExperience: (data, callBack) => {
        let query = `update experience set company_name=?, work_from=?, work_to=?, position=?, description=?, status=? where id = ?`;
        let insertQuery = `insert into experience(company_name, work_from, work_to, position, description, status) 
        values(?,?,?,?,?,?)`;
        let isUpdated = false;
        data.forEach(el => {
            if (!el.id) {
                pool.query(insertQuery, [
                    el.company_name, el.work_from, el.work_to, el.position, el.description, el.status, el.id
                ], (error, results, fields) => {
                    console.log('resu', results)
                })
            }
            pool.query(query, [
                el.company_name, el.work_from, el.work_to, el.position, el.description, el.status, el.id
            ],
                (error, results, fields) => {
                    if (error) {
                        isUpdated = false;
                    }
                    isUpdated = true;
                    // callBack(null, results[0]);
                })
        })
        if (isUpdated) {
            let success = json({
                success: 0,
                message: "Record Not Found"
            });
            callBack(null, success);
        }
        callBack(0);
    },

    updateResumeEducation: (data, callBack) => {
        let query = `update education set college_name=?, college_from=?, college_to=?, course=?, status=? where id = ?`;
        let insertQuery = `insert into education(college_name, college_from, college_to, course, status) 
        values(?,?,?,?,?)`
        let isUpdated = {};
        data.forEach(el => {
            if (!el.id) {
                pool.query(insertQuery, [el.college_name, el.college_from, el.college_to, el.course, el.status, el.id
                ], (error, results, fields) => {
                    console.log('results', results)
                })
            }
            pool.query(query, [
                el.college_name, el.college_from, el.college_to, el.course, el.status, el.id
            ], (error, results, fields) => {
                if (error) {
                    isUpdated = false;
                }
                isUpdated = results;
                // callBack(null, results[0]);
                // console.log('results', results)
            })
        })
        if (isUpdated) {
            callBack(null, null);
        }
        callBack(0);
    }
};
