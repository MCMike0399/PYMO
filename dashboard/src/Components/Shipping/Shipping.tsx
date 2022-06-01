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
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DataGridPro,
  GridColDef,
  GridRowId,
  GridSelectionModel,
} from "@mui/x-data-grid-pro";
import axios from "axios";

const columns: GridColDef[] = [
  {
    field: "fechaProgramada",
    headerName: "Fecha Programada",
    width: 150,
    type: "date",
  },
  { field: "fechaEnvio", headerName: "Fecha Envio", width: 150, type: "date" },
  {
    field: "fechaConfirmada",
    headerName: "Fecha Confirmada",
    width: 150,
    type: "date",
  },
  { field: "nombre", headerName: "Hospital", width: 150 },
  { field: "descripcion", headerName: "Articulo", width: 200 },
  {
    field: "cantidadAprobada",
    headerName: "Cantidad",
    width: 100,
    type: "number",
  },
  {
    field: "cantidadEntregada",
    headerName: "Cantidad Entregada",
    width: 100,
    type: "number",
  },
  {
    field: "montoRechazado",
    headerName: "Monto Rechazado",
    width: 100,
    type: "number",
  },
  {
    field: "motivoRechazo",
    headerName: "Motivo Rechazo",
    width: 100,
  },
  {
    field: "idInsumo",
    headerName: "idInsumo",
    width: 100,
    type: "number",
    hide: true,
  },
  {
    field: "claveH",
    headerName: "claveH",
    width: 100,
    type: "number",
    hide: true,
  },
  {
    field: "idEntrega",
    headerName: "idEntrega",
    width: 100,
    type: "number",
    hide: true,
  },
];

function Shipping() {
  const [tableData, setTableData] = React.useState([]);
  const [openEnvio, setOpenEnvio] = React.useState(false);
  const [openConfirmada, setOpenConfirmada] = React.useState(false);
  const [envioDate, setEnvioDate] = React.useState<Date | null>(new Date());
  const [confirmDate, setConfirmDate] = React.useState<Date | null>(new Date());
  const [idShipping, setIdShipping] = React.useState(0);
  const [idInsumo, setIdInsumo] = React.useState(0);
  const [cantidadEntregada, setCantidadEntregada] = React.useState(0);
  const [montoRechazado, setMontoRechazado] = React.useState(0);
  const [motivoRechazo, setMotivoRechazo] = React.useState("");
  const [claveH, setClaveH] = React.useState(0);
  const [idEntrega, setIdEntrega] = React.useState(0);

  const handleClickOpenEnvio = () => {
    setOpenEnvio(true);
  };
  const handleClickOpenConfirmada = () => {
    setOpenConfirmada(true);
  };
  const handleClickCloseEnvio = () => {
    setOpenEnvio(false);
  };
  const handleClickCloseConfirmada = () => {
    setOpenConfirmada(false);
  };
  const handleClickGuardarEnvio = async () => {
    const json = {
      idShipping: idShipping,
      envioDate: envioDate,
    };
    const res = await axios.put("http://localhost:5000/shipping", json);
    console.log(res);
    await refresh();
    setOpenEnvio(false);
  };
  const handleClickGuardarConfirm = async () => {
    const json = {
      idShipping: idShipping,
      idInsumo: idInsumo,
      claveH: claveH,
      cantidadEntregada: cantidadEntregada,
      fechaConfirmada: new Date(confirmDate as Date)
        .toISOString()
        .split("T")[0],
      montoRechazado: montoRechazado,
      motivoRechazo: motivoRechazo,
      idEntrega: idEntrega
    };
    const res = await axios.put("http://localhost:5000/entregas", json);
    console.log(res);
    await refresh();
    setOpenConfirmada(false);
  };

  const refresh = async () => {
    const data = await axios.get("http://localhost:5000/shipping");
    setTableData(data.data.results);
  };

  React.useEffect(() => {
    refresh()
      .then(() => {
        console.log("Refreshed");
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Grid
        sx={{
          height: 400,
          width: "100%",
          backgroundColor: "white",
          marginTop: "0.7rem",
        }}
      >
        <DataGridPro
          rows={tableData}
          columns={columns}
          onRowClick={(params, event, details) => {
            console.log(params.row);
            setIdShipping(params.row.id);
            setIdInsumo(params.row.idInsumo);
            setClaveH(params.row.claveH);
            setCantidadEntregada(params.row.cantidadEntregada)
            setIdEntrega(params.row.idEntrega);
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
        <Grid item xs={2}>
          <Button
            onClick={handleClickOpenEnvio}
            sx={{ backgroundColor: "white" }}
          >
            Envia Pedido
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={handleClickOpenConfirmada}
            sx={{ backgroundColor: "white" }}
          >
            Entrega Pedido
          </Button>
        </Grid>
      </Grid>

      <Dialog open={openEnvio} onClose={handleClickCloseEnvio}>
        <DialogTitle>Asignar Fecha</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              //label="Fecha"
              openTo="year"
              views={["year", "month", "day"]}
              value={envioDate}
              onChange={(newValue) => {
                setEnvioDate(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ width: "11rem" }} {...params} />
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseEnvio}>Cancel</Button>
          <Button onClick={handleClickGuardarEnvio}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmada} onClose={handleClickCloseConfirmada}>
        <DialogTitle>Entrega Pedido</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              //label="Fecha"
              openTo="year"
              views={["year", "month", "day"]}
              value={confirmDate}
              onChange={(newValue) => {
                setConfirmDate(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ width: "11rem" }} {...params} />
              )}
            />
          </LocalizationProvider>
          <TextField
            size="small"
            sx={{ width: "11rem" }}
            label="Cantidad Entregada"
            type="number"
            onChange={(event) => {
              setCantidadEntregada(event.target.value as unknown as number);
            }}
          />
          <TextField
            size="small"
            sx={{ width: "11rem" }}
            label="Monto Rechazado"
            type="number"
            onChange={(event) => {
              setMontoRechazado(event.target.value as unknown as number);
            }}
          />
          <TextField
            size="small"
            sx={{ width: "11rem" }}
            label="Motivo Rechazo"
            onChange={(event) => {
              setMotivoRechazo(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseConfirmada}>Cancel</Button>
          <Button onClick={handleClickGuardarConfirm}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Shipping;
