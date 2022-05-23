import React from "react";
import { Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../Fonts/fonts.css";
import Card from "./Card";
// <Card icon={DashboardIcon} nombre="Dashboard" />

function SideBar() {
  return (
    <Grid
      container
      direction="column"
      alignItems="left"
      justifyContent="center"
      sx={{ fontFamily: "Agora Slab Pro" }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
        <DashboardIcon />
        </Grid>
        <Grid item xs sx={{fontSize:'1.3rem'}}>
            Dashboard
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SideBar;
