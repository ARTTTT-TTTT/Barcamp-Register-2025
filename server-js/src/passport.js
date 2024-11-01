require('dotenv').config()

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        async function (accessToken, refreshToken, profile, done) {

            done(null, profile)
        }
    )
);

passport.serializeUser((data, done) => {

    done(null, data)
});

passport.deserializeUser((data, done) => {

    done(null, data)
});