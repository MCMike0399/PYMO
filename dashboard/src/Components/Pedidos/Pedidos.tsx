import React from "react";
import { Grid, Button } from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  GridRowId,
  GridSelectionModel,
} from "@mui/x-data-grid-pro";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "descripcion", headerName: "Articulo", width: 200 },
  {
    field: "cantidadPedida",
    headerName: "Cantidad Pedida",
    width: 150,
    type: "number",
  },
  {
    field: "cantidadAprobada",
    headerName: "Cantidad Aprobada",
    width: 150,
    type: "number",
  },
  { field: "fecha", headerName: "Fecha", width: 110, type: "date" },
  { field: "nombre", headerName: "Hospital", width: 150 },
  { field: "idInsumo", headerName: "idInsumo", width: 150, hide: true },
  { field: "claveH", headerName: "claveH", width: 150, hide: true },
];

function Pedidos() {
  const [tableData, setTableData] = React.useState([]);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5000/pedidos");
      return data;
    };
    fetchData()
      .then((res: any) => {
        setTableData(res.data.results);
      })
      .catch(console.error);
  }, []);

  const enviarPedidos = async () => {
    const selectedRows: never[] = [];
    selectionModel.forEach(
      (value: GridRowId, index: number, array: GridRowId[]) => {
        const result = tableData.find((obj: any) => {
          return obj.id === value;
        });
        selectedRows.push(result as never);
      }
    );
    console.log(selectedRows);
    const res = await axios.post("http://localhost:5000/shipping", selectedRows);
    console.log(res);
  };

  return (
    <>
      <Grid sx={{ height: 550, width: "100%", backgroundColor: "white"  }}>
        <DataGridPro
          checkboxSelection
          rows={tableData}
          columns={columns}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={enviarPedidos}>Enviar Pedidos Seleccionados</Button>
      </Grid>
    </>
  );
}

export default Pedidos;
