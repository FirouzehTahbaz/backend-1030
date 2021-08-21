const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    createUser,
    deleteExperien,
    deleteEducation
} = require("./experience.controller");
router.post("/experience", checkToken, createUser);
router.get("/experience-delete/:id", checkToken, deleteExperien);
router.get("/education-delete/:id", checkToken, deleteEducation);

module.exports = router;