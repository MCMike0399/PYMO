import React from "react";
import { Grid, Tab, Tabs } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SidebarLink from "./Components/Sidebar/SidebarLink";
import Header from "./Components/Sidebar/Header";
import Hospital from "./Components/Hospital/Hospital";
import Insumos from "./Components/Insumos/Insumos";
import Pedidos from "./Components/Pedidos/Pedidos";
import Shipping from "./Components/Shipping/Shipping";
import Entregas from "./Components/Entregas/Entregas";
import Dashboard from "./Components/Dashboard/Dashboard";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  width: "14rem",
  height: "44.1rem",
};

function App() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid container direction="row">
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ ...commonStyles, borderRadius: "1rem", display: "flex" }}
      >
        <Header />
        <Tabs
          value={selectedTab}
          orientation="vertical"
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab
            icon={<SidebarLink text="Dashboard" Icon={DashboardIcon} />}
            sx={{ width: "14rem" }}
          />
          <Tab
            icon={<SidebarLink text="Hospital" Icon={LocalHospitalIcon} />}
          />
          <Tab
            icon={<SidebarLink text="Pedidos" Icon={LocalGroceryStoreIcon} />}
          />
          <Tab
            icon={<SidebarLink text="Shipping" Icon={LocalShippingIcon} />}
          />
          <Tab
            icon={<SidebarLink text="Entregas" Icon={LocalPostOfficeIcon} />}
          />
          <Tab icon={<SidebarLink text="Insumos" Icon={InventoryIcon} />} />
        </Tabs>
      </Grid>
      <Grid item xs>
        {selectedTab === 0 && <Dashboard />}
        {selectedTab === 1 && <Hospital />}
        {selectedTab === 2 && <Pedidos />}
        {selectedTab === 3 && <Shipping />}
        {selectedTab === 4 && <Entregas />}
        {selectedTab === 5 && <Insumos />}
      </Grid>
    </Grid>
  );
}

export default App;
