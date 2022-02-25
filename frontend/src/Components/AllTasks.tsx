import {
  Button,
  Checkbox,
  Container,
  Paper,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppThunkDispatch } from "../Store";
import { clearMessage } from "../Store/slices/messageSlice";
import { deleteTask, getAllTask } from "../Store/slices/taskSlice";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";

function AllTasks() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: tasks } = useSelector((state: RootState) => state.task);
  const [open, setOpen] = React.useState(false);
  const [selectedEdit, setSelectedEdit] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(clearMessage());
      dispatch(getAllTask(user.id));
    }
  }, []);

  useEffect(() => {
    if (selectedEdit != null) {
      handleOpen();
    }
  }, [selectedEdit]);
  const handleSelectEdit = (selectedid: number) => {
    const task = tasks.find((task) => task.id === selectedid);
    setSelectedEdit(task);
  };

  return (
    <div>
      <Container maxWidth="md">
        <CreateTask />
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Done</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks &&
                tasks.map((task, index) => (
                  <TableRow
                    key={task.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Checkbox checked={task.isDone} disabled />
                    </TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          handleSelectEdit(task.id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          dispatch(deleteTask(task.id))
                            .unwrap()
                            .then(() => {
                              dispatch(getAllTask(user.id));
                            });
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {selectedEdit && (
        <EditTask
          open={open}
          handleClose={handleClose}
          selectedEdit={selectedEdit}
          setSelectedEdit={setSelectedEdit}
          userid={user.id}
        />
      )}
    </div>
  );
}

export default AllTasks;
