import React from "react";
import { Grid } from "@mui/material";
import Form from "./Components/Form";

function App() {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Form />
      </Grid>
    </div>
  );
}

export default App;
