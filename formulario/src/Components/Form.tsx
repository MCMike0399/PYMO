import React from "react";
import {
  Grid,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import Header from "./Header";
import Pregunta from "./Pregunta";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  width: "50rem",
  height: "44.1rem",
};

function Form() {
  const [nombreHosp, setNombreHosp] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [cubrebocas, setCubrebocas] = React.useState(0);
  const [caretas, setCaretas] = React.useState(0);
  const [mascarillas, setMascarillas] = React.useState(0);
  const [primerDate, setPrimerDate] = React.useState<Date | null>(new Date());
  const [segundoDate, setSegundoDate] = React.useState<Date | null>(new Date());
  const [tercerDate, setTercerDate] = React.useState<Date | null>(new Date());
  const [primerMes, setPrimerMes] = React.useState(0);
  const [segundoMes, setSegundoMes] = React.useState(0);
  const [tercerMes, setTercerMes] = React.useState(0);

  const handleNombreHosp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombreHosp(event.target.value as string);
  };
  const handleRegionSelected = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };
  const handleDireccion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDireccion(event.target.value as string);
  };
  const handleMascarillas = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMascarillas(event.target.value as unknown as number);
  };
  const handleCubrebocas = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCubrebocas(event.target.value as unknown as number);
  };
  const handleCaretas = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaretas(event.target.value as unknown as number);
  };
  const handlePrimerMes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimerMes(event.target.value as unknown as number);
  };
  const handleSegundoMes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSegundoMes(event.target.value as unknown as number);
  };
  const handleTercerMes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTercerMes(event.target.value as unknown as number);
  };

  const guardarDatos = async () => {
    const json = {
      hospital: nombreHosp,
      region: region,
      direccion: direccion,
      cubrebocas: cubrebocas,
      caretas: caretas,
      mascarillas: mascarillas,
      primerDate: primerDate,
      primerMes: primerMes,
      segundoDate: segundoDate,
      segundoMes: segundoMes,
      tercerDate: tercerDate,
      tercerMes: tercerMes
    };
    const res = await axios.post(
      "http://localhost:5000/formulario",
      JSON.stringify(json),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems="flex-start"
      sx={{ ...commonStyles, borderRadius: "1rem" }}
    >
      <Grid item xs>
        <Header />
      </Grid>
      <Grid item xs>
        <Grid container direction="row" alignItems="center">
          <Pregunta pregunta="¿Cuál es el nombre del hospital?" />
          <TextField
            label="Escriba su respuesta"
            variant="outlined"
            size="small"
            sx={{ width: "20rem" }}
            value={nombreHosp}
            onChange={handleNombreHosp}
          />
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction="row" alignItems="center">
          <Pregunta pregunta="¿Cuál es la región del hospital?" />
          <FormControl size="small" sx={{ width: "20rem" }}>
            <InputLabel>Seleccione la opción</InputLabel>
            <Select
              value={region}
              label="Seleccione la opción"
              onChange={handleRegionSelected}
            >
              <MenuItem value="Noroeste">Noroeste</MenuItem>
              <MenuItem value="Noreste">Noreste</MenuItem>
              <MenuItem value="Centro Norte">Centro Norte</MenuItem>
              <MenuItem value="Oeste">Oeste</MenuItem>
              <MenuItem value="Centro Sur">Centro Sur</MenuItem>
              <MenuItem value="Este">Este</MenuItem>
              <MenuItem value="Suroeste">Suroeste</MenuItem>
              <MenuItem value="Sureste">Sureste</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction="row" alignItems="center">
          <Pregunta pregunta="¿Cuál es la dirección del hospital?" />
          <TextField
            label="Escriba su respuesta"
            variant="outlined"
            size="small"
            sx={{ width: "20rem" }}
            value={direccion}
            onChange={handleDireccion}
          />
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction="row" alignItems="center">
          <Pregunta pregunta="Número de casos en los últimos 3 meses" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="1er mes"
              openTo="year"
              views={["year", "month"]}
              value={primerDate}
              onChange={(newValue) => {
                setPrimerDate(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ width: "11rem" }} {...params} />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="NoCasos"
            variant="outlined"
            size="small"
            type="number"
            sx={{ width: "8rem" }}
            //value={primerMes}
            onChange={handlePrimerMes}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="2do mes"
              openTo="year"
              views={["year", "month"]}
              value={segundoDate}
              onChange={(newValue) => {
                setSegundoDate(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ width: "11rem" }} {...params} />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="NoCasos"
            variant="outlined"
            size="small"
            type="number"
            sx={{ width: "8rem" }}
            //value={segundoMes}
            onChange={handleSegundoMes}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="1er mes"
              openTo="year"
              views={["year", "month"]}
              value={tercerDate}
              onChange={(newValue) => {
                setTercerDate(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ width: "11rem" }} {...params} />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="NoCasos"
            variant="outlined"
            size="small"
            type="number"
            sx={{ width: "8rem" }}
            //value={tercerMes}
            onChange={handleTercerMes}
          />
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container direction="row" alignItems="center">
          <Pregunta pregunta="Digite la cantidad de insumos:" />
          <TextField
            label="Cubrebocas"
            variant="outlined"
            size="small"
            type="number"
            sx={{ width: "8rem" }}
            //value={cubrebocas}
            onChange={handleCubrebocas}
          />
          <TextField
            label="Mascarillas"
            variant="outlined"
            size="small"
            type="number"
            sx={{ width: "8rem" }}
            //value={mascarillas}
            onChange={handleMascarillas}
          />
          <TextField
            label="Caretas"
            variant="outlined"
            size="small"
            type="number"
            sx={{ width: "8rem" }}
            //value={caretas}
            onChange={handleCaretas}
          />
        </Grid>
      </Grid>
      <Grid item xs>
        <Button onClick={guardarDatos}>Enviar</Button>
      </Grid>
    </Grid>
  );
}

export default Form;
