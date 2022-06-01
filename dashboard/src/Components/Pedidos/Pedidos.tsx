import React from "react";
import { Grid, Button } from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  GridRowId,
  GridSelectionModel,
  GridRowParams,
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
  {
    field: "idInsumo",
    headerName: "idInsumo",
    width: 150,
    hide: true,
    type: "number",
  },
  {
    field: "claveH",
    headerName: "claveH",
    width: 150,
    hide: true,
    type: "number",
  },
  {
    field: "enviado",
    headerName: "Enviado",
    width: 150,
    hide: true,
    type: "number",
  },
];

function Pedidos() {
  const [tableData, setTableData] = React.useState([]);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const refresh = async () => {
    const data = await axios.get("http://localhost:5000/pedidos");
    setTableData(data.data.results);
    setSelectionModel([]);
  };

  React.useEffect(() => {
    refresh().then(() => {
      console.log("Refreshed");
    })
    .catch(console.error);
  }, []);

  const enviarPedidos = async () => {
    const selectedRows: never[] = [];
    const selectedIds: never[] = [];
    selectionModel.forEach(
      (value: GridRowId, index: number, array: GridRowId[]) => {
        const result = tableData.find((obj: any) => {
          return obj.id === value;
        }) as any;
        selectedRows.push(result as never);
        selectedIds.push(result.id as never);
      }
    );
    console.log(selectedRows);
    const resPost = await axios.post(
      "http://localhost:5000/shipping",
      selectedRows
    );
    console.log(resPost);
    const resPut = await axios.put(
      "http://localhost:5000/pedidos",
      selectedIds
    );
    console.log(resPut);
    await refresh();
  };

  return (
    <>
      <Grid
        sx={{
          height: 500,
          width: "100%",
          backgroundColor: "white",
          marginTop: "0.7rem",
        }}
      >
        <DataGridPro
          checkboxSelection
          rows={tableData}
          columns={columns}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          isRowSelectable={(params: GridRowParams) => {
            return params.row.enviado === 0;
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
        <Button onClick={enviarPedidos} sx={{ backgroundColor: "white" }}>
          Enviar Pedidos Seleccionados
        </Button>
      </Grid>
    </>
  );
}

export default Pedidos;
