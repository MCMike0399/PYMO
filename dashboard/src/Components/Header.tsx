import { Grid, Box } from "@mui/material";
import pymoLogo from "../assets/pymo_alone.png";

// background: 'linear-gradient(to right, #5C7DF3, #1D22DC, #B96493, #C55042, #E28E25)'

function Header() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      
    >
      <Box sx={{ borderColor: 'primary.main'  }}>
        <img
          src={pymoLogo}
          alt="pymoLogo"
          style={{
            width: "100%",
            height: "auto",
           // paddingTop: "0.3rem",
           // paddingLeft: "0.1rem",
            border: "1px solid #e6e3e3"
          }}
        />
      </Box>
    </Grid>
  );
}

export default Header;
