const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  getUserResumeDetails,
  resumeUpdateDetails,
  resumeUpdateExperience,
  resumeUpdateEducation
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/", checkToken, createUser);
// router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/update", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
router.get("/:id", checkToken, getUserResumeDetails);
router.patch("/update-detail", checkToken, resumeUpdateDetails);
router.patch("/update-experience", checkToken, resumeUpdateExperience);
router.patch("/update-education", checkToken, resumeUpdateEducation);

module.exports = router;
