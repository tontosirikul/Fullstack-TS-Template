import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { useNavigate } from "react-router-dom";

function ProfileForm(props: {
  setIsUpdate: (arg0: boolean) => void;
  user: { username: string; email: string };
}) {
  return (
    <>
      <TextField
        label="username"
        type="username"
        id="username"
        name="username"
        variant="outlined"
        fullWidth
        margin="dense"
        value={props.user.username}
        required
      />
      <TextField
        label="email"
        type="email"
        id="email"
        name="email"
        variant="outlined"
        fullWidth
        margin="dense"
        value={props.user.email}
        required
      />
      <TextField
        label="verify by password"
        type="password"
        id="password"
        name="password"
        variant="outlined"
        fullWidth
        margin="dense"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
        onClick={() => {
          props.setIsUpdate(false);
        }}
      >
        Save Profile
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt: 1, mb: 1 }}
        onClick={() => {
          props.setIsUpdate(false);
        }}
      >
        Cancel
      </Button>
    </>
  );
}

function ProfileData() {
  return (
    <>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        123
      </Typography>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        123
      </Typography>
    </>
  );
}

function Info() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

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
            Profile
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            {!isUpdate ? (
              <ProfileData />
            ) : (
              <ProfileForm setIsUpdate={setIsUpdate} user={user} />
            )}
            {!isUpdate ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 3 }}
                onClick={() => {
                  setIsUpdate(true);
                }}
              >
                Update Profile
              </Button>
            ) : null}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Info;
