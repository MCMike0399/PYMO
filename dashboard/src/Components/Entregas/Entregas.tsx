import React from "react";
import { Grid } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import axios from "axios";

const columns: GridColDef[] = [
  {
    field: "cantidadEntregada",
    headerName: "Cantidad Entregada",
    width: 150,
    type: "number",
  },
  {
    field: "fechaConfirmada",
    headerName: "Fecha Confirmada",
    width: 150,
    type: "date",
  },
  { field: "nombre", headerName: "Hospital", width: 150 },
  { field: "descripcion", headerName: "Articulo", width: 200 },
];

function Entregas() {
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5000/entregas");
      return data;
    };
    fetchData()
      .then((res: any) => {
        setTableData(res.data.results);
      })
      .catch(console.error);
  }, []);

  return (
    <Grid sx={{ height: 300, width: "100%" }}>
      <DataGridPro rows={tableData} columns={columns} />
    </Grid>
  );
}

export default Entregas;
