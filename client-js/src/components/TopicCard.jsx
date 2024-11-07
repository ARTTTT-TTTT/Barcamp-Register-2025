import { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    CardActions,
    colors,
    Box,
    Typography,
    CardContent,
    Card,
    Grid,
    Button,
    DialogContent,
    Dialog,
    useMediaQuery,
    IconButton,
} from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import AlertBox from "./AlertBox";
import { userContext } from "../pages/VotePage";
import api from "../api/api";

function TopicCard({ data, callback }) {
    const Recommend = "Recommend";
    const isMobile = useMediaQuery("(max-width:600px)");
    const dialogSize = isMobile ? "sm" : "lg";
    const [alert, setAlert] = useState(false);
    const [check, setCheck] = useState(data.status);
    const user = useContext(userContext);
    const [open, setOpen] = useState(false);
    const MOBILE_SIZE = 600;

    // ตรวจสอบขนาดหน้าจอ
    const isMobileSize = () => window.innerWidth <= MOBILE_SIZE;
    // const [vote , setVote] = useState(0)
    // const [limitvote , setLimitVote] = useState(0)
    const checker = () => {
        api.post("/voted", { user, id: data._id })
            .then((res) => {
                if (res.data.message !== "Vote to limit.") {
                    // setVote(res.data.vote_count)
                    // setLimitVote(res.data.limit)
                    setCheck(!check);
                    callback(data);
                    handleClose();
                } else {
                    setAlert(true);
                    handleClose();
                }
            })
            .catch(() => window.location.reload());
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const callbackClose = () => {
        setAlert(false);
    };

    return (
        <div>
            <Card sx={{ borderRadius: "1rem" }} elevation={4} onClick={handleClickOpen}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            mb: "-12px",
                            alignItems: "center",
                            position: "relative",
                            width: "100%", // คงค่าความกว้างของ Card
                            maxWidth: "none", // ลบ maxWidth ที่ถูกกำหนดมาแบบอัตราส่วน
                        }}
                    >
                        {data.recommend && (
                            <div>
                                {/* แสดงเฉพาะในหน้าจอเล็ก */}
                                <RecommendIcon
                                    sx={{
                                        position: "absolute",
                                        right: -10,
                                        top: -10,
                                        color: "#FFD700",
                                        overflow: "hidden",
                                        maxWidth: "1em",
                                        textOverflow: "ellipsis",
                                    }}
                                />
                            </div>
                        )}

                        <Box>
                            <FavoriteIcon style={{ color: check ? "red" : "grey", width: "50px", height: "50px" }} />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                ml: "0.5rem",
                                flex: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "pre-wrap",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    fontWeight: "700",
                                    fontSize: isMobileSize() ? "16px" : "20px",
                                    fontFamily: "Noto Sans Thai",
                                    justifyContent: "center",
                                }}
                                gutterBottom
                                component="div"
                            >
                                {data.title.length > 100 ? `${data.title.substring(0, 100)}...` : data.title}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.2rem",
                                        textAlign: "center",
                                        width: "100%", // คงค่าความกว้างของส่วนทางขวา
                                    }}
                                >
                                    <AccountCircleIcon sx={{ color: "#4ED99E" }} />
                                    <Typography variant="caption">
                                        {data.speaker.length > 5 ? `${data.speaker.substring(0, 5)}...` : data.speaker}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.2rem",
                                        textAlign: "center",
                                        width: "100%", // คงค่าความกว้างของส่วนทางขวา
                                    }}
                                >
                                    <AccessTimeFilledIcon sx={{ color: "#DE8887" }} />
                                    <Typography variant="caption">{data.long_duration ? "1 ชม." : "30 น."}</Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.2rem",
                                        textAlign: "center",
                                        width: "100%", // คงค่าความกว้างของส่วนทางขวา
                                    }}
                                >
                                    <LocalOfferIcon sx={{ color: "#A62B66" }} />
                                    <Typography variant="caption">{data.category !== "" ? data.category : "N/A"}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
                <AlertBox
                    content="ขณะนี้คุณได้โหวตครบจำนวน 10 ครั้งแล้ว หากต้องการเปลี่ยนหัวข้อ กรุณากดยกเลิกโหวตบางหัวข้อ"
                    alert={alert}
                    callbackClose={callbackClose}
                />
            </Card>
            <Dialog
                onClose={handleClose}
                open={open}
                maxWidth={dialogSize}
                fullWidth
                sx={{
                    borderRadius: "1rem",
                }}
            >
                <div>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 2,
                            top: 2,
                            color: (theme) => theme.palette.grey[500],
                            zIndex: 1,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {data.recommend ? (
                        <>
                            <RecommendIcon
                                sx={{
                                    position: "absolute",
                                    left: 8,
                                    top: 8,
                                    color: "#FFD700",
                                    zIndex: 1,
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 35,
                                    top: 9,
                                    fontSize: 15,
                                    color: "#FFD700",
                                    fontWeight: "700",
                                    fontFamily: "Noto Sans Thai",
                                    zIndex: 1,
                                }}
                            >
                                {Recommend}
                            </Box>
                        </>
                    ) : null}

                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                        <DialogContent sx={{ background: "#FFFF " }}>
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    whiteSpace: "pre-wrap",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    fontWeight: "700",
                                    fontSize: 20,
                                    mt: 2,
                                    fontFamily: "Noto Sans Thai",
                                    justifyContent: "center",
                                }}
                                gutterBottom
                                component="div"
                            >
                                <div className="Font-title">{data.title}</div>
                            </Typography>
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    whiteSpace: "pre-wrap",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    mt: -2,
                                    mb: 2,
                                    fontWeight: "700", // หรือใช้ 'bolder' ตามความต้องการ
                                    fontSize: 15,

                                    fontFamily: "Noto Sans Thai",
                                }}
                                gutterBottom
                                component="div"
                            ></Typography>
                            {data.description ? (
                                <Box
                                    sx={{
                                        borderRadius: "0.1rem",
                                        alignItems: "left",
                                        justifyItems: "center",
                                        background: "#EBEBEB",
                                        pt: 1,
                                        pb: 1,
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            mx: 2,
                                            overflow: "auto",
                                            fontSize: 16,
                                            fontFamily: "Noto Sans Thai",
                                            maxHeight: "150px", // กำหนดความสูงสูงสุด (ตัวอย่างเท่านั้น)
                                        }}
                                    >
                                        {data.description}
                                    </Typography>
                                </Box>
                            ) : null}

                            <Grid
                                sx={{ flexGrow: 1, flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-evenly" }}
                                container
                                spacing={1}
                            >
                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <AccountCircleIcon sx={{ color: "#4ED99E" }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                gutterBottom
                                                sx={{
                                                    fontSize: 15,

                                                    fontFamily: "Noto Sans Thai",
                                                }}
                                            >
                                                {data.speaker}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <AccessTimeFilledIcon sx={{ color: "#DE8887" }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                gutterBottom
                                                sx={{
                                                    fontSize: 15,

                                                    fontFamily: "Noto Sans Thai",
                                                }}
                                            >
                                                {data.long_duration ? "1 ชั่วโมง" : "30 นาที"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <LocalOfferIcon sx={{ color: "#A62B66" }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                gutterBottom
                                                sx={{
                                                    fontSize: 15,

                                                    fontFamily: "Noto Sans Thai",
                                                }}
                                            >
                                                {data.category !== "" ? data.category : "N/A"}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <CardActions sx={{ mt: 1, justifyContent: "center" }}>
                                <Button
                                    onClick={checker}
                                    sx={{
                                        minHeight: "32px",
                                        width: "fit",
                                        minWidth: "200px",
                                        maxWidth: "270px",
                                        borderRadius: "0.7rem",
                                        px: "6rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        background: check ? colors.red["A400"] : "#27db5d",
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: "700", whiteSpace: "nowrap", marginRight: "8px" }}>
                                        {check ? "ยกเลิกโหวต" : "โหวต"}
                                    </Typography>
                                </Button>
                            </CardActions>
                        </DialogContent>
                    </Box>
                </div>
            </Dialog>
        </div>
    );
}

TopicCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        speaker: PropTypes.string.isRequired,
        category: PropTypes.string,
        description: PropTypes.string,
        long_duration: PropTypes.bool,
        recommend: PropTypes.bool,
        status: PropTypes.bool,
    }).isRequired,
    callback: PropTypes.func.isRequired,
};

export default TopicCard;