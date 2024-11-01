const session = require("express-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
require("./passport");

//Routes
const authRoute = require("./routes/authRoute");
const participantRoute = require("./routes/participantRoute");
const ConsoleRoute = require("./routes/ConsoleRoute");
const adminRoute = require("./routes/adminRoute");
const voteRoute = require("./routes/voteRoute");
const config = require("./config");

//mongoose.set("strictQuery", true);

mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database."))
    .catch((err) => console.error("Error connected to Database:", err));

app.use(
    session({
        secret: "barcamp8", // Change this to a secure random string
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/api", express.static(__dirname));

app.use(
    cors({
        origin: process.env.PRODUCTION ? "*" : "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/auth", authRoute);
app.use("/auth", adminRoute);
app.use("/api", participantRoute);
app.use("/api", ConsoleRoute);
app.use("/api", voteRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running!");
});
