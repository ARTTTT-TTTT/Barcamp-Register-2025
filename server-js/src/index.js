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
        secret: "barcamp8", // Use a secure random string stored in an env variable
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            secure: process.env.PRODUCTION === true, // Use secure cookies in production
            httpOnly: true, // Prevent JavaScript access to cookies
            sameSite: "strict", // Prevent CSRF
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/api", express.static(__dirname));

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:4000", process.env.CLIENT_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
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
