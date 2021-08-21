const {
    create,
    getUsers,
    updateUser,
    deleteExperien,
    deleteEducation
} = require("./experience.service");
const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

exports.createUser = await = (req, res) => {
    const experiences = req.body;
    experiences.forEach(element => {
        create(element, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    })
}

exports.deleteExperien = (req, res) => {
    const id = req.params.id;
    deleteExperien(id, (err, results) => {
        if (err) {
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not Found"
            });
        }
        return res.json({
            success: 1,
            message: "Experience deleted successfully"
        });
    });
}

exports.deleteEducation = (req, res) => {
    const id = req.params.id;
    deleteEducation(id, (err, results) => {
        if (err) {
            return;
        }
        if (!results) {
            return res.json({
                success: 0,
                message: "Record Not Found"
            });
        }
        return res.json({
            success: 1,
            message: "Education deleted successfully"
        });
    });
}