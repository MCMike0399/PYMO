import React from "react";
import { Grid } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SidebarLink from "./SidebarLink";
import Header from "./Header";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  width: "14rem",
  height: "44.1rem",
};

function Sidebar() {

  function renderDashboard() {
      
  }

  return (
    <Grid
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      sx={{ ...commonStyles, borderRadius: "1rem", display: "flex" }}
    >
      <Header />
      <SidebarLink text="Dashboard" Icon={DashboardIcon}  />
      <SidebarLink text="Dashboard" Icon={DashboardIcon} />
      <SidebarLink text="Dashboard" Icon={DashboardIcon} />
      <SidebarLink text="Dashboard" Icon={DashboardIcon} />
    </Grid>
  );
}

export default Sidebar;
