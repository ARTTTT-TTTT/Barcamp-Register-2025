require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Strategy สำหรับการล็อกอินทั่วไป
passport.use(
    "google-login",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            // แก้ไขให้แน่ใจว่าเรียกใช้ done
            return done(null, profile);
        }
    )
);

// Strategy สำหรับการลงทะเบียนพิเศษ
passport.use(
    "google-special-register",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/special-register/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            // แก้ไขให้แน่ใจว่าเรียกใช้ done
            return done(null, profile);
        }
    )
);

passport.serializeUser((data, done) => {
    done(null, data);
});

passport.deserializeUser((data, done) => {
    done(null, data);
});
