import express, { Request, Response } from "express";
import { User, UserStore } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../middleware/verifyAuthToken";

dotenv.config();

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const signup = async (req: Request, res: Response) => {
  const user: User = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const userwithtoken = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as jwt.Secret
    );
    res.json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      userwithtoken: userwithtoken,
    });
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const user = {
      email: req.body.email ? req.body.email : null,
      username: req.body.username ? req.body.username : null,
    };

    const updatedUser = await store.update(parseInt(req.params.id), user);
    const userwithtoken = jwt.sign(
      { user: updatedUser },
      process.env.TOKEN_SECRET as jwt.Secret
    );
    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      userwithtoken,
    });
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(parseInt(req.params.id));
    res.json(deletedUser);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const changepassword = async (req: Request, res: Response) => {
  try {
    const updatedUser = await store.changepassword(
      parseInt(req.params.id),
      req.body.oldpassword,
      req.body.newpassword
    );
    res.json(updatedUser);
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(400).send({ message });
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.email, user.password);
    const userwithtoken = jwt.sign(
      { user: u },
      process.env.TOKEN_SECRET as jwt.Secret
    );
    res.json({
      id: u.id,
      username: u.username,
      email: u.email,
      userwithtoken: userwithtoken,
    });
  } catch (error: unknown) {
    const { message } = error as Error;
    res.status(401).send({ message });
  }
};

const user_routes = (app: express.Application): void => {
  app.post("/signup", signup);
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.put("/users/:id", verifyAuthToken, update);
  app.put("/users/changepassword/:id", verifyAuthToken, changepassword);
  app.post("/signin", authenticate);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

export default user_routes;
