import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Container,
  Paper,
  Table,
  TableContainer,
  Typography,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppThunkDispatch } from "../Store";
import { clearMessage } from "../Store/slices/messageSlice";
import { getAllTask } from "../Store/slices/taskSlice";
import CreateTask from "./CreateTask";

function AllTasks() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.task);
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
              {data &&
                data.map((d, index) => (
                  <TableRow
                    key={d.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Checkbox checked={d.isDone} />
                    </TableCell>
                    <TableCell>{d.title}</TableCell>
                    <TableCell>{d.description}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="success">
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default AllTasks;
