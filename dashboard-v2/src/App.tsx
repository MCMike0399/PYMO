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
    console.log(newValue);
    setSelectedTab(newValue);
  };

  return (
    <Grid container direction="row">
      <Grid
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
        {selectedTab === 1 && <Hospital />}
      </Grid>
    </Grid>
  );
}

export default App;
