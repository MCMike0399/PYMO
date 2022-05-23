import React from "react";
import { Box } from "@mui/material";
import "../../Fonts/Fonts.css";

type Props = {
  text: string;
  Icon: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function SidebarLink(props: Props) {
  return (
    <Box
      sx={{
        fontFamily: "PF Agora Slab Pro",
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        "&:hover": {
          background: "#c4c4cf",
          borderRadius: "1rem"
        },
        height: '4rem',
        width: '100%',
        
      }}
    >
      <props.Icon sx={{ marginRight: "0.7rem" }} />
      <h2>{props.text}</h2>
    </Box>
  );
}

export default SidebarLink;
