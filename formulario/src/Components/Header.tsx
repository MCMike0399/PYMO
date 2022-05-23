import React from "react";
import { Grid, Typography } from "@mui/material";
import pymoIcon from "../assets/pymo_alone.png";
import "../Fonts/Fonts.css";

function Header() {
  return (
    <Grid
      mt={2}
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ marginBottom: 3, borderWidth: "1rem" }}
    >
      <Typography variant="h3" component="div" gutterBottom sx={{fontFamily: "Filson Soft"}}>
        Solicitud de Insumos
      </Typography>
      <img
        src={pymoIcon}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "9.5rem",
          marginBottom: 20
        }}
      ></img>
    </Grid>
  );
}

export default Header;
