import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "nombre", headerName: "Nombre", width: 150 },
  { field: "region", headerName: "Region", width: 150 },
  { field: "direccion", headerName: "Dirección", width: 150 },
  {
    field: "noCubrebocas",
    headerName: "Cubrebocas",
    width: 100,
    type: "number",
  },
  {
    field: "noMascarillas",
    headerName: "Mascarillas",
    width: 100,
    type: "number",
  },
  { field: "noCaretas", headerName: "Caretas", width: 100, type: "number" },
  {
    field: "casosTotales",
    headerName: "Casos Totales",
    width: 100,
    type: "number",
  },
];

function Hospital() {
  const [tableData, setTableData] = React.useState([]);
  const [nomHospital, setNombreHospital] = React.useState("");
  const [idHospital, setIdHospital] = React.useState(0);
  const [noCubrebocas, setNoCubrebocas] = React.useState(0);
  const [noMascarillas, setNoMascarillas] = React.useState(0);
  const [noCaretas, setNoCaretas] = React.useState(0);
  const [cubrebocasAsign, setCubrebocasAsign] = React.useState(0);
  const [mascarillasAsign, setMascarillasAsign] = React.useState(0);
  const [caretasAsign, setCaretasAsign] = React.useState(0);
  const [openCubrebocas, setOpenCubrebocas] = React.useState(false);
  const [openMascarillas, setOpenMascarillas] = React.useState(false);
  const [openCaretas, setOpenCaretas] = React.useState(false);

  const handleClickOpenCubrebocas = () => {
    setOpenCubrebocas(true);
  };
  const handleClickOpenMascarillas = () => {
    setOpenMascarillas(true);
  };
  const handleClickOpenCaretas = () => {
    setOpenCaretas(true);
  };

  const handleCloseCubrebocas = () => {
    setOpenCubrebocas(false);
  };
  const handleCloseMascarillas = () => {
    setOpenMascarillas(false);
  };
  const handleCloseCaretas = () => {
    setOpenCaretas(false);
  };

  const handleGuardarCubrebocas = async () => {
    const json = {
      claveH: idHospital,
      cantidadPedida: noCubrebocas,
      cantidadAprobada: cubrebocasAsign,
      idInsumo: 2, // está super hardcodeado :( mil disculpas
      fecha: new Date().toISOString().split("T")[0],
    };
    console.log(json);
    const result = await axios.post(
      "http://localhost:5000/pedidos",
      JSON.stringify(json),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);
    setOpenCubrebocas(false);
  };

  const handleGuardarMascarillas = async () => {
    const json = {
      claveH: idHospital,
      cantidadPedida: noMascarillas,
      cantidadAprobada: mascarillasAsign,
      idInsumo: 1, // está super hardcodeado :( mil disculpas
      fecha: new Date().toISOString().split("T")[0],
    };
    console.log(json);
    const result = await axios.post(
      "http://localhost:5000/pedidos",
      JSON.stringify(json),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);
    setOpenMascarillas(false);
  };

  const handleGuardarCaretas = async () => {
    const json = {
      claveH: idHospital,
      cantidadPedida: noCaretas,
      cantidadAprobada: caretasAsign,
      idInsumo: 3, // está super hardcodeado :( mil disculpas
      fecha: new Date().toISOString().split("T")[0],
    };
    console.log(json);
    const result = await axios.post(
      "http://localhost:5000/pedidos",
      JSON.stringify(json),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);
    setOpenCaretas(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5000/hospital");
      return data;
    };
    fetchData()
      .then((res: any) => {
        setTableData(res.data.results);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Grid sx={{ height: 400, width: "100%", backgroundColor: "white" }}>
        <DataGridPro
          rows={tableData}
          columns={columns}
          onRowClick={(params, event, details) => {
            console.log(params.row);
            setIdHospital(params.row.id);
            setNombreHospital(params.row.nombre);
            setNoCubrebocas(params.row.noCubrebocas);
            setNoMascarillas(params.row.noMascarillas);
            setNoCaretas(params.row.noCaretas);
          }}
        />
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={handleClickOpenCubrebocas}>Asignar Cubrebocas</Button>
        <Button onClick={handleClickOpenMascarillas}>
          Asignar Mascarillas
        </Button>
        <Button onClick={handleClickOpenCaretas}>Asignar Caretas</Button>
      </Grid>
      <Dialog open={openCubrebocas} onClose={handleCloseCubrebocas}>
        <DialogTitle>Crear Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container direction="row" sx={{ fontWeight: "bold" }}>
              {nomHospital}
            </Grid>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cantidad a Asignar"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setCubrebocasAsign(event.target.value as unknown as number);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCubrebocas}>Cancel</Button>
          <Button onClick={handleGuardarCubrebocas}>Guardar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openMascarillas} onClose={handleCloseMascarillas}>
        <DialogTitle>Crear Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container direction="row" sx={{ fontWeight: "bold" }}>
              {nomHospital}
            </Grid>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cantidad a Asignar"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setMascarillasAsign(event.target.value as unknown as number);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMascarillas}>Cancel</Button>
          <Button onClick={handleGuardarMascarillas}>Guardar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openCaretas} onClose={handleCloseCaretas}>
        <DialogTitle>Crear Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container direction="row" sx={{ fontWeight: "bold" }}>
              {nomHospital}
            </Grid>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cantidad a Asignar"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setCaretasAsign(event.target.value as unknown as number);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCaretas}>Cancel</Button>
          <Button onClick={handleGuardarCaretas}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Hospital;
