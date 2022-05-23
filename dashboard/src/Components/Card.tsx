import React from 'react'
import { Grid } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type CardProps = {
    nombre: string,
    icon: any
}

function Card(props: CardProps) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs>
            {props.icon}
        </Grid>
        <Grid item xs>
            {props.nombre}
        </Grid>
    </Grid>
  )
}

export default Card