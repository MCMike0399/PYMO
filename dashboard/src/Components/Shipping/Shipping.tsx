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
];

function Shipping() {
  const [tableData, setTableData] = React.useState([]);
  const [openEnvio, setOpenEnvio] = React.useState(false);
  const [openConfirmada, setOpenConfirmada] = React.useState(false);
  const [envioDate, setEnvioDate] = React.useState<Date | null>(new Date());
  const [idShipping, setIdShipping] = React.useState(0);

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
    setOpenEnvio(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5000/shipping");
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
            setIdShipping(params.row.id);
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
        <Button onClick={handleClickOpenEnvio}>Envia Pedido</Button>
        <Button>Entrega Pedido</Button>
      </Grid>
      <Dialog open={openEnvio} onClose={handleClickCloseEnvio}>
        <DialogTitle>Asignar Fecha</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              //label="Fecha"
              openTo="year"
              views={["year", "month"]}
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
    </>
  );
}

export default Shipping;
