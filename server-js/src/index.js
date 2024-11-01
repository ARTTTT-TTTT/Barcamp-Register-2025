const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

//Routes
const authRoute = require("./routes/authRoute");
const participantRoute = require("./routes/participantRoute");
const ConsoleRoute = require("./routes/ConsoleRoute");
const adminRoute = require("./routes/adminRoute");
const voteRoute = require("./routes/voteRoute");
const config = require("./config");

//mongoose.set("strictQuery", true);

mongoose
    .connect(config.databaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database."))
    .catch((err) => console.error("Error connected to Database:", err));

app.use(
    cookieSession({
        name: "session",
        keys: ["barcamp8"],
        maxAge: 24 * 60 * 60 * 100,
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
