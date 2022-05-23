import { Grid } from "@mui/material";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <Grid>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Sidebar />
      </Grid>
    </Grid>
  );
}

export default App;
