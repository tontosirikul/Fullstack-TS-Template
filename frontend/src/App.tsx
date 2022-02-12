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
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      {/* provide default styling */}
      <CssBaseline />
      <Navbar />
      <main>
        <Signin />
      </main>
    </>
  );
}

export default App;
