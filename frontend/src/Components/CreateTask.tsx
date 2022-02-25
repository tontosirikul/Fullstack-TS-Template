import { TextField, Box, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppThunkDispatch } from "../Store";
import { createTask } from "../Store/slices/taskSlice";

function CreateTask() {
  const dispatch = useAppThunkDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      createTask({
        title: data.get("title") as string,
        description: data.get("description") as string,
        isDone: false,
        userid: user.id,
      })
    )
      .unwrap()
      .then(() => {
        console.log("send");
      });
  };
  return (
    <div>
      <Box
        component="main"
        sx={{
          marginTop: 1,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextField
            label="title"
            type="title"
            id="title"
            name="title"
            variant="outlined"
            fullWidth
            margin="dense"
            autoFocus
            autoComplete="current-title"
            required
            sx={{ mr: 1, width: "48%" }}
          />
          <TextField
            label="description"
            type="description"
            id="description"
            name="description"
            variant="outlined"
            fullWidth
            margin="dense"
            autoFocus
            autoComplete="current-description"
            required
            sx={{ mr: 1, width: "48%" }}
          />
          <Button type="submit" variant="contained">
            Add task
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default CreateTask;
