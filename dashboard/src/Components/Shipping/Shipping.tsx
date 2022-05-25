import React from "react";
import { Grid } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "fechaProgramada", headerName: "Fecha Programada", width: 150, type: "date" },
  { field: "fechaEnvio", headerName: "Fecha Envio", width: 150, type: "date" },
  { field: "nombre", headerName: "Hospital", width: 150 },
  { field: "descripcion", headerName: "Articulo", width: 200 },
  { field: "cantidadAprobada", headerName: "Cantidad", width: 100, type: "number" },
];

function Shipping() {
  const [tableData, setTableData] = React.useState([]);

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
    <Grid sx={{ height: 300, width: "100%" }}>
      <DataGridPro rows={tableData} columns={columns} />
    </Grid>
  );
}

export default Shipping;
