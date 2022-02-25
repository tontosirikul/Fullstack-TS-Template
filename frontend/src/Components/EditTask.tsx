import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppThunkDispatch } from "../Store";
import { editTask, getAllTask } from "../Store/slices/taskSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditTask(props: {
  open: any;
  handleClose: any;
  selectedEdit: {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
  };
  setSelectedEdit: any;
  userid: number;
}) {
  const dispatch = useAppThunkDispatch();
  const [checked, setChecked] = React.useState<boolean>(
    props.selectedEdit.isDone
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      editTask({
        id: props.selectedEdit.id,
        title: data.get("title") as string,
        description: data.get("description") as string,
        isDone: checked,
        userid: props.userid,
      })
    )
      .unwrap()
      .then(() => {
        // dispatch(getAllTask(props.userid));
        props.handleClose();
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <TextField
            label="title"
            type="title"
            id="title"
            name="title"
            variant="outlined"
            fullWidth
            margin="dense"
            defaultValue={props.selectedEdit ? props.selectedEdit.title : ""}
            autoFocus
            required
          />
          <TextField
            label="description"
            type="description"
            id="description"
            name="description"
            variant="outlined"
            fullWidth
            margin="dense"
            defaultValue={
              props.selectedEdit ? props.selectedEdit.description : ""
            }
            autoFocus
            required
          />
          <Checkbox
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            checked={checked}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              props.setSelectedEdit(null);
              props.handleClose();
            }}
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default EditTask;
