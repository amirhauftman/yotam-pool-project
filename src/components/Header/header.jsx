import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate(); //belog to the router

  return (
    <AppBar position="static" style={{ height: "10vh" }}>
      <Toolbar
        style={{
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "6fr 1fr",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ASGARD'S POOL
        </Typography>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => navigate("/luz", { replace: true })}
          >
            לוח שיעורים
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/", { replace: true })}
          >
            דף הבית
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
