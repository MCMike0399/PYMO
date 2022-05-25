import React from "react";
import { Grid } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
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
];

function Pedidos() {
  const [tableData, setTableData] = React.useState([]);

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

  return (
    <Grid sx={{ height: 350, width: "100%" }}>
      <DataGridPro rows={tableData} columns={columns} />
    </Grid>
  );
}

export default Pedidos;
