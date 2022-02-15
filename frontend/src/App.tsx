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
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Navbar from "./Components/Navbar";
import Info from "./Components/Info";
import AllTasks from "./Components/AllTasks";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/* provide default styling */}
      <CssBaseline />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/signin" element={<Signin history={[]} />} />
          <Route path="/signup" element={<Signup history={[]} />} />
          <Route path="/info/" element={<Info history={[]} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
