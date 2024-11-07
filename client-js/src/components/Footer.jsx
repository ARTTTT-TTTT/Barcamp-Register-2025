import { Grid, useMediaQuery, useTheme } from "@mui/material";

function Footer() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xl"));

    return (
        <Grid
            container
            rowGap={3}
            columns={12}
            className="canvas"
            sx={{
                position: "relative",
                mt: "auto",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",

                overflow: "hidden",
            }}
        >
            <div className="cloud"></div>
            <div className="cloud a"></div>
            <div className="cloud b"></div>
            <div className="cloud c"></div>
            <div className="land"></div>
            <div className="star"></div>
            <div className="star a"></div>
            <div className="star b"></div>
            <div className="star c"></div>
            <div className="star d"></div>
            <div className="wind"></div>
            <div className="eclipse">
                <div className="sun"></div>
                <div className="sun a"></div>
                <div className="moon"></div>
                <div className="moon a"></div>
            </div>
            <Grid
                item
                xl={4}
                xs={6}
                sx={{
                    textAlign: "center",
                    zIndex: "10",
                }}
            >
                <img width={matches ? "80" : "120"} src="/images/pupa_logo_blue_with_bg.png" alt="BarcampLogo" />
            </Grid>
            <Grid item xl={4} xs={6} sx={{ textAlign: "center", zIndex: "10" }}>
                <img width={matches ? "80" : "120"} src="/images/DragonBARCAMPblack8sxl-removebg-preview_w_bg.png" alt="BarcampLogo" />
            </Grid>
        </Grid>
    );
}

export default Footer;
