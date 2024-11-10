const router = require("express").Router();
const passport = require("passport");

const Participant = require("../models/participant");
const Console = require("../models/console");
const config = require("../config");

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

router.get("/login/failed", (req, res) => {
    res.redirect(`${config.client_url}`); // เปลี่ยนเส้นทางไปหน้า register
});

router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.status(500).json({ error: true, message: "Logout failed" });
        }

        res.status(200).clearCookie("connect.sid", {
            path: "/",
        });
        res.redirect(`${config.client_url}`);
    });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/login/failed" }), (req, res) => {
    // ตรวจสอบสถานะของผู้ใช้หลังจากเข้าสู่ระบบสำเร็จ
    if (req.user) {
        let email = req.user.emails[0].value;

        // ค้นหาผู้ใช้ในฐานข้อมูล
        Participant.findOne({ email }).then((currentUser) => {
            if (currentUser) {
                if (currentUser.status === "") {
                    return res.redirect(`${config.client_url}/form`);
                } else {
                    return res.redirect(`${config.client_url}/profile`);
                }
            } else {
                return res.redirect(`${config.client_url}/form`);
            }
        });
    } else {
        res.redirect(`${config.client_url}`);
    }
});

module.exports = router;
