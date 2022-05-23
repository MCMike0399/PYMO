import React from 'react'
import { Grid } from '@mui/material';
import "../Fonts/Fonts.css";

type Props = {
    pregunta: string;
}

function Pregunta(props: Props) {
  return (
    <Grid sx={{fontFamily: "PF Agora Slab Pro", fontWeight: "bold", fontSize:"large", marginRight: 3}}>
        {props.pregunta}
    </Grid>
  )
}

export default Pregunta