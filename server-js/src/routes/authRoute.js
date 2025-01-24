const router = require("express").Router();
const passport = require("passport");

require("dotenv").config();
const Participant = require("../models/participant");
const Console = require("../models/console");
const config = require("../config");

const CLIENT_URL = config.client_url;
const SPECIAL_SECRET_URL = config.SPECIAL_SECRET_URL;
const SPECIAL_SECRET_FORM_URL = config.SPECIAL_SECRET_FORM_URL;

router.get("/login/success", (req, res) => {
    if (req.user) {
        let email = req.user.emails[0].value;

        Participant.findOne({ email }).then(async (currentUser) => {
            let console_lst = await Console.findOne({ name: "control" });
            let editable = new Date(console_lst.end_register).getTime() - new Date().getTime() > 0;

            if (currentUser) {
                res.status(200).json({
                    error: false,
                    message: "successfull",
                    infomation: req.user,
                    user: currentUser,
                    editable,
                    console_lst,
                    //   cookies: req.cookies
                });
            } else {
                Participant.create({ email }).then((newUser) => {
                    res.status(200).json({
                        error: false,
                        message: "successfull",
                        infomation: req.user,
                        user: newUser,
                        editable,
                        console_lst,
                        //   cookies: req.cookies
                    });
                });
            }
        });
    } else {
        res.status(200).json({
            error: false,
            message: "No session.",
            //   cookies: req.cookies
        });
    }
});

router.get("/special-login/success", (req, res) => {
    if (req.user) {
        let email = req.user.emails[0].value;

        Participant.findOne({ email }).then(async (currentUser) => {
            // let console_lst = await Console.findOne({ name: "control" });
            let editable = true;

            if (currentUser) {
                res.status(200).json({
                    error: false,
                    message: "successfull",
                    infomation: req.user,
                    user: currentUser,
                    editable,
                    // console_lst,
                    // cookies: req.cookies
                });
            } else {
                Participant.create({ email }).then((newUser) => {
                    res.status(200).json({
                        error: false,
                        message: "successfull",
                        infomation: req.user,
                        user: newUser,
                        editable,
                        // console_lst,
                        // cookies: req.cookies
                    });
                });
            }
        });
    } else {
        res.status(200).json({
            error: false,
            message: "No session.",
            //   cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.redirect(`${CLIENT_URL}`); // เปลี่ยนเส้นทางไปหน้า register
});

router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.status(500).json({ error: true, message: "Logout failed" });
        }

        res.status(200).clearCookie("connect.sid", {
            path: "/",
        });
        res.redirect(`${CLIENT_URL}`);
    });
});

// เส้นทางสำหรับ Google Login และ Callback สำหรับ user ทั่วไป
router.get("/google", passport.authenticate("google-login", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google-login", { failureRedirect: "/auth/login/failed" }), async (req, res) => {
    if (req.user) {
        let email = req.user.emails[0].value;

        try {
            const currentUser = await Participant.findOne({ email });
            if (currentUser) {
                const redirectUrl = currentUser.status === "" ? `${CLIENT_URL}/form` : `${CLIENT_URL}/profile`;
                return res.redirect(redirectUrl);
            } else {
                return res.redirect(`${CLIENT_URL}/form`);
            }
        } catch (error) {
            console.error(error);
            return res.redirect(`${CLIENT_URL}`);
        }
    } else {
        return res.redirect(CLIENT_URL);
    }
});

// เส้นทางสำหรับ Special Register และ Callback สำหรับ กรณีพิเศษ
router.get("/google/special-register", passport.authenticate("google-special-register", { scope: ["profile", "email"] }));

router.get(
    "/google/special-register/callback",
    passport.authenticate("google-special-register", { failureRedirect: "/auth/login/failed" }),
    async (req, res) => {
        if (req.user) {
            let email = req.user.emails[0].value;

            // ถ้า user login ด้วย role "CONFIRMED" ไป หน้า login หลัก รอ vote
            // ถ้าเป็น role อื่นๆ ให้ไปหน้า specioal form กรอกข้อมูลใหม่ พร้อมเป็น role "CONFIRMED" อัตโนมัติ
            try {
                const currentUser = await Participant.findOne({ email });
                if (currentUser) {
                    const redirectUrl =
                        currentUser.status === "CONFIRMED"
                            ? `${CLIENT_URL}`
                            : `${CLIENT_URL}/special-register/${SPECIAL_SECRET_URL}/${SPECIAL_SECRET_FORM_URL}`;
                    return res.redirect(redirectUrl);
                } else {
                    return res.redirect(`${CLIENT_URL}/special-register/${SPECIAL_SECRET_URL}/${SPECIAL_SECRET_FORM_URL}`);
                }
            } catch (error) {
                console.error(error);
                return res.redirect(`${CLIENT_URL}/special-register/${SPECIAL_SECRET_URL}`);
            }
        } else {
            return res.redirect(`${CLIENT_URL}/special-register/${SPECIAL_SECRET_URL}`);
        }
    }
);

module.exports = router;
