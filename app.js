require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const experienceRouter = require("./api/experience/experience.route");
const portfolioRouter = require("./api/portfolio/portfolio.route");

app.use(express.json());

app.get('/login', (req, res) => {
  res.send('login coall sucesfully')
})

app.use("/api", userRouter);
app.use("/api", experienceRouter);
// app.use("/api", portfolioRouter);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
