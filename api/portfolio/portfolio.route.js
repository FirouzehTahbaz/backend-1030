const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadFiles } = require("./portfolio.controller");
const upload = require("./upload")

router.post("/upload", checkToken, upload.single("file"), uploadFiles);
