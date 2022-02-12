import React from "react";

import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
function Navbar() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6">To do lists</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
