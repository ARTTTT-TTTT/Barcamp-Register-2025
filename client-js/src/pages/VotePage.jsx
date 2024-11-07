/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography, createTheme, ThemeProvider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import TopicCard from "../components/TopicCard";
import Footer from "../components/Footer";
import AlertBox from "../components/AlertBox.jsx";
import api from "../api/api.js";

import "../styles/scrollbar.css";
import "../styles/sun.css";
import "../styles/vote.css";

const userContext = React.createContext();

function VotePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [point, setPoint] = useState(null);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState(false);
    const [centent, setContent] = useState("");
    const { user, Console } = useLoaderData();
    const navigate = useNavigate();

    let user_id = user.user._id;

    const themeLight = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#fff",
            },
            secondary: {
                main: "#52cfe3",
            },
        },
        typography: {
            fontFamily: "Noto Sans Thai, san serif",
        },
    });

    useEffect(() => {
        if (Console.vote !== true || !user_id || user.user.status !== "CONFIRMED") {
            navigate("/profile");
        }
    }, [navigate, user_id, Console.vote, user.user.status]);

    //Fetch
    useEffect(() => {
        if (user_id) {
            api.get(`/topics/?user=${user_id}`).then((res) => {
                if (res.data.Istime) {
                    let me_vote = res.data.topics_to_send.filter((e) => e.status);
                    let not_vote = res.data.topics_to_send.filter((e) => !e.status).sort(() => 0.5 - Math.random());
                    //console.log(not_vote)
                    setData(me_vote.concat(not_vote));
                    setPoint(res.data.topics_to_send.filter((e) => e.status).length);
                } else {
                    setContent("กลับไปหน้าแรก");
                    setAlert(true);
                }
            });
        }
    }, [user_id]);

    const search_filter = (val) => {
        if (searchTerm === "") {
            return val;
        } else if (
            val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.category.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
            return val;
        }
    };

    //Callback from Topic Card when click
    const callback = (res) => {
        let dummy = data.map((e) => {
            if (e._id === res._id) {
                e.status = !e.status;
            }
            return e;
        });

        let me_vote = dummy.filter((e) => e.status);
        let not_vote = dummy.filter((e) => !e.status);

        setData(me_vote.concat(not_vote));
        setPoint(dummy.filter((e) => e.status).length);
    };

    return (
        <userContext.Provider value={user_id}>
            <ThemeProvider theme={themeLight}>
                <section className="vote-page">
                    <NavBar used_point={point} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "100vh",
                        }}
                    >
                        <Box
                            sx={{
                                zIndex: 200,
                                padding: "1rem",
                                position: "sticky",
                                mt: "3rem",
                                top: "3.7rem",
                            }}
                        >
                            {alert ? (
                                <Typography
                                    sx={{
                                        position: "fixed",
                                        top: "20%",
                                        left: "50%",
                                        transform: "translate(-50% ,-50%)",
                                        textAlign: "center",
                                    }}
                                    variant="body2"
                                >
                                    It's not time to vote or voting time has expired.
                                </Typography>
                            ) : (
                                <Container>
                                    <Searchbar
                                        placeholder="Search Topic"
                                        onChange={(event) => {
                                            setSearchTerm(event.target.value);
                                        }}
                                    />
                                </Container>
                            )}
                        </Box>
                        <Container maxWidth="lg" sx={{ mt: "1rem", mb: "1rem" }}>
                            <AnimatePresence>
                                <Grid container spacing={2} columns={12}>
                                    {data.filter(search_filter).map((e, i) => (
                                        <Grid item xs={12} lg={6} key={e._id} sx={{ zIndex: data.length - i }}>
                                            <motion.div
                                                key={e._id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <TopicCard data={e} callback={callback} index={i} />
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </AnimatePresence>

                            <AlertBox content={centent} alert={alert} callbackClose={() => {}} />
                        </Container>
                        <Footer />
                    </Box>
                </section>
            </ThemeProvider>
        </userContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export { userContext };
export default VotePage;
