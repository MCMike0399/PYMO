import React from "react";
import { Grid } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import axios from "axios";

const columns: GridColDef[] = [
  { field: "sku", headerName: "SKU", width: 100 },
  { field: "descripcion", headerName: "Descripción", width: 200 },
  { field: "unidad", headerName: "Unidad", width: 70 },
  { field: "cantidad", headerName: "Cantidad", width: 80 },
];

function Insumos() {
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:5000/insumos");
      return data;
    };
    fetchData()
      .then((res: any) => {
        setTableData(res.data.results);
      })
      .catch(console.error);
  }, []);

  return (
    <Grid sx={{ height: 300, width: "100%", backgroundColor: "white" }}>
      <DataGridPro rows={tableData} columns={columns} />
    </Grid>
  );
}

export default Insumos;
