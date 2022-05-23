import React from "react";
import { Grid } from "@mui/material";
import iconPYMO from "../../assets/pimo_alone_3.png";

function Header() {
  return (
    <Grid mt={2} container direction="row" alignItems="center" justifyContent="center" sx={{marginBottom: 3, borderWidth: '1rem' ,borderBottomColor: 'linear-gradient(to right, red, white)'}}>
      <img
        src={iconPYMO}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "5rem"
        }}
      ></img>
    </Grid>
  );
}

export default Header;
