import { Grid, CssBaseline } from "@mui/material";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <Grid>
      <Grid container sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //marginTop: "0.2rem",
        width: "10%",
      }}>
        <CssBaseline>
          <Header />
        </CssBaseline>
        <SideBar />
      </Grid>
    </Grid>
  );
}

export default App;

/*
<Grid>
      <Grid container sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //marginTop: "0.2rem",
        width: "10%",
      }}>
        <CssBaseline>
          <Header />
        </CssBaseline>
        <SideBar />
      </Grid>
    </Grid>
*/
