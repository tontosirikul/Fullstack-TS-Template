import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { register } from "../Store/slices/authSlice";
import { clearMessage } from "../Store/slices/messageSlice";
import { useAppThunkDispatch } from "../Store";
import {
  Typography,
  Container,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  Grid,
} from "@mui/material";
import { couldStartTrivia } from "typescript";

function Signup() {
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state: RootState) => state.message);

  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setSuccessful(false);

    dispatch(
      register({
        username: data.get("username") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="username"
              type="username"
              id="username"
              name="username"
              variant="outlined"
              fullWidth
              margin="dense"
              autoFocus
            />
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
            <FormControlLabel
              control={<Checkbox />}
              label="Accept the policy"
              sx={{ mt: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 3 }}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-end">
              <Link align="center">Already have an account? Sign in</Link>
            </Grid>
          </Box>
        </Box>
        {message && (
          <div className="form-group">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default Signup;
