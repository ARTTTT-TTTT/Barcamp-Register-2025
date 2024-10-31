import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

// import Wave from "../FooterWave/Wave";
// import Tower from "../Tower/Tower";
import barcampLogo from "../../image/DragonBARCAMPblack8sxl-removebg-preview_w_bg.png";
import pupaLogo_blue from "../../image/pupa_logo_blue_with_bg.png";
import "./Sun.css";

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
        // backgroundColor: "white",
        // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        mt: "auto",
        width: "100%",
        // display: 'flex',
        // flexDirection: 'column',
        // marginY: 'auto',
        alignItems: "center",
        justifyContent: "center",
        
        overflow: "hidden",
      }}
    >
      <div className="cloud"></div>
      <div className="cloud a"></div>
      <div className="cloud b"></div>
      <div className="cloud c"></div>
      <div className="land">
        {/* <div className="tree"></div>
        <div className="tree a"></div>
        <div className="tree b"></div>
        <div className="tree c"></div>
        <div className="tree d"></div> */}
      </div>
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
        <img
          width={matches ? "80" : "120"}
          src={pupaLogo_blue}
          alt="BarcampLogo"
        />
      </Grid>
      <Grid item xl={4} xs={6} sx={{ textAlign: "center", zIndex: "10" }}>
        <img
          width={matches ? "80" : "120"}
          src={barcampLogo}
          alt="BarcampLogo"
        />
      </Grid>
      {/* <Grid item xl={4} xs={12} sx={{ textAlign : 'center' }}>
                <Typography variant='subtitle1' fontWeight='bold'>Created by PUPA</Typography>
            </Grid> */}
      {/* <Wave /> */}
      {/* <Tower /> */}
      {/* <div className='sun'  /> */}
    </Grid>
  );
}

export default Footer;
