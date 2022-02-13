import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppThunkDispatch } from "../Store";
import { clearMessage } from "../Store/slices/messageSlice";
import { login } from "../Store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Signin(props: { history: string[] }) {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.message);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const initialValues = {
    username: "",
    password: "",
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    dispatch(
      login({
        email: data.get("email") as string,
        password: data.get("password") as string,
      })
    )
      .unwrap()
      .then((data) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        navigate(`/info/${user.id}`);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="main"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              label="email"
              type="email"
              id="email"
              name="email"
              variant="outlined"
              fullWidth
              margin="dense"
              autoFocus
            />
            <TextField
              label="password"
              type="password"
              id="password"
              name="password"
              variant="outlined"
              fullWidth
              margin="dense"
              autoFocus
              autoComplete="current-password"
            />
            {/* <FormControlLabel control={<Checkbox />} label="Remember me" /> */}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Sign in
            </Button>
          </Box>
          {loading && <CircularProgress />}
          {message && <Alert severity="error">{message}</Alert>}
        </Box>
      </Container>
    </>
  );
}

export default Signin;
