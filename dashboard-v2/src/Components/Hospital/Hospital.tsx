import React from "react";
import { Grid } from "@mui/material";
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
    <Grid sx={{ height: 300, width: "100%" }}>
      <DataGridPro rows={tableData} columns={columns} />
    </Grid>
  );
}

export default Hospital;
