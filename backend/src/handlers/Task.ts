import express, { Request, Response } from "express";
import { Task, TaskStore } from "../models/Task";
import dotenv from "dotenv";
import verifyAuthToken from "../middleware/verifyAuthToken";

dotenv.config();

const store = new TaskStore();

const index = async (req: Request, res: Response) => {
  try {
    const tasks = await store.index(parseInt(req.params.id));
    res.json(tasks);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const task = await store.show(parseInt(req.params.id));
    res.json(task);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const create = async (req: Request, res: Response) => {
  const task: Task = {
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone,
    AssignedUserId: req.body.userid,
  };
  try {
    const newTask = await store.create(task);
    res.json(newTask);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const update = async (req: Request, res: Response) => {
  const task: Task = {
    title: req.body.title,
    description: req.body.description,
    isDone: req.body.isDone,
    AssignedUserId: req.body.userid,
  };
  try {
    const newTask = await store.update(parseInt(req.params.id), task);

    res.json(newTask);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedTask = await store.delete(parseInt(req.params.id));
    res.json(deletedTask);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const task_routes = (app: express.Application): void => {
  app.post("/tasks", verifyAuthToken, create);
  app.get("/tasksbyuser/:id", verifyAuthToken, index);
  app.get("/tasks/:id", verifyAuthToken, show);
  app.put("/tasks/:id", verifyAuthToken, update);
  app.delete("/tasks/:id", verifyAuthToken, destroy);
};

export default task_routes;
