import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store";
import { useNavigate } from "react-router-dom";
import { useAppThunkDispatch } from "../Store";
import {
  changePassword,
  changeProfile,
  logout,
} from "../Store/slices/authSlice";
import { clearMessage, setMessage } from "../Store/slices/messageSlice";

function ProfileForm(props: {
  setIsUpdate: (arg0: boolean) => void;
  setIsChangePassword: (arg0: boolean) => void;
  user: { username: string; email: string; id: number };
}) {
  const { message } = useSelector((state: RootState) => state.message);
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      changeProfile({
        username: data.get("username") as string,
        email: data.get("email") as string,
        id: props.user.id,
      })
    )
      .unwrap()
      .then(() => {
        props.setIsUpdate(false);
        props.setIsChangePassword(false);
        window.location.reload();
      })
      .catch(() => {});
  };

  return (
    <>
      <Box sx={{ mt: 3 }} component="form" onSubmit={handleSubmit}>
        <TextField
          label="username"
          type="username"
          id="username"
          name="username"
          variant="outlined"
          fullWidth
          margin="dense"
          defaultValue={props.user.username}
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
          defaultValue={props.user.email}
          required
        />
        {message && <Alert severity="error">{message}</Alert>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          Save Profile
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 1, mb: 1 }}
          onClick={() => {
            props.setIsUpdate(false);
            props.setIsChangePassword(false);
          }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}

function PasswordForm(props: {
  setIsChangePassword: (arg0: boolean) => void;
  setIsUpdate: (arg0: boolean) => void;
  user: { username: string; email: string; id: number };
}) {
  const { message } = useSelector((state: RootState) => state.message);
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("oldpassword") != data.get("newpassword")) {
      console.log(data.get("newpassword") as string);
      dispatch(
        changePassword({
          oldpassword: data.get("oldpassword") as string,
          newpassword: data.get("newpassword") as string,
          id: props.user.id,
        })
      )
        .unwrap()
        .then(() => {
          props.setIsUpdate(false);
          props.setIsChangePassword(false);
        })
        .catch(() => {});
    } else {
      dispatch(setMessage("Please use new password"));
    }
  };
  return (
    <>
      <Box sx={{ mt: 3 }} component="form" onSubmit={handleSubmit}>
        <TextField
          label="old password"
          type="password"
          id="oldpassword"
          name="oldpassword"
          variant="outlined"
          fullWidth
          margin="dense"
          autoFocus
          required
        />
        <TextField
          label="new password"
          type="password"
          id="newpassword"
          name="newpassword"
          variant="outlined"
          fullWidth
          margin="dense"
          autoFocus
          required
        />
        {message && <Alert severity="error">{message}</Alert>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 1 }}
        >
          Save Password
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 1, mb: 1 }}
          onClick={() => {
            props.setIsUpdate(false);
            props.setIsChangePassword(false);
          }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}

function ProfileData(props: {
  user: { username: string; email: string; id: number };
}) {
  return (
    <>
      <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
        {props.user.username}
      </Typography>
      <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
        {props.user.email}
      </Typography>
    </>
  );
}

function Info(props: { history: string[] }) {
  const { user: userfromstore } = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState(userfromstore);
  const [isUpdate, setIsUpdate] = useState(false);

  const [isChangePassword, setIsChangePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    setUser(userfromstore);
    if (!userfromstore) {
      navigate("/signin");
    }
  }, [navigate, user, userfromstore]);

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
          <Typography variant="h2" align="center" color="textPrimary">
            Profile
          </Typography>

          {!isUpdate && !isChangePassword ? (
            <ProfileData user={user ? user : {}} />
          ) : null}
          {isChangePassword && (
            <PasswordForm
              setIsUpdate={setIsUpdate}
              setIsChangePassword={setIsChangePassword}
              user={user ? user : {}}
            />
          )}
          {isUpdate && (
            <ProfileForm
              setIsUpdate={setIsUpdate}
              setIsChangePassword={setIsChangePassword}
              user={user}
            />
          )}

          {!isUpdate && !isChangePassword ? (
            <>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  setIsUpdate(true);
                  setIsChangePassword(false);
                }}
              >
                Update Profile
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  setIsChangePassword(true);
                  setIsUpdate(false);
                }}
              >
                Change Password
              </Button>
              <Button
                fullWidth
                color="error"
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </Button>
            </>
          ) : null}
        </Box>
      </Container>
    </>
  );
}

export default Info;
