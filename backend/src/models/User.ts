import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

const prisma = new PrismaClient();

const saltRounds: string = bcrypt.genSaltSync(
  parseInt(process.env.saltRounds as string)
);
const bcrypt_code: string = process.env.bcrypt_code as string;

export type User = {
  id?: number;
  email: string;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const result = await prisma.user.findMany();
      return result;
    } catch (error) {
      throw new Error(`Cannot get user ${error}`);
    }
  }
  async show(id: number): Promise<User | null> {
    try {
      const result = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      return result;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const password = bcrypt.hashSync(
        user.password + bcrypt_code,
        parseInt(saltRounds)
      );
      const result = await prisma.user.create({
        data: {
          email: user.email,
          username: user.username,
          password: password,
        },
      });
      return result;
    } catch (err) {
      throw new Error(
        `Could not add new user ${user.email} ${user.username} . Error: ${err}`
      );
    }
  }
  async update(
    id: number,
    user: { email: string; username: string }
  ): Promise<User> {
    try {
      // const password = bcrypt.hashSync(
      //   user.password + bcrypt_code,
      //   parseInt(saltRounds)
      // );

      const email: string = user.email;
      const username: string = user.username;

      // const result = await prisma.user.update({
      //   where: { id: Number(id) || undefined },
      //   data: { email, username, password },
      // });
      const result = await prisma.user.update({
        where: { id: Number(id) || undefined },
        data: { email, username },
      });
      return result;
    } catch (err) {
      throw new Error(
        `Could not update user ${user.email} ${user.username}. Error: ${err}`
      );
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const result = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
      return result;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
  async authenticate(email: string, password: string): Promise<User> {
    try {
      const result = await prisma.user.findUnique({
        where: {
          email: String(email),
        },
      });

      if (result != null) {
        if (bcrypt.compareSync(password + bcrypt_code, result.password)) {
          return result;
        }
      }
      throw new Error("user not found");
    } catch (error) {
      throw new Error("user not found");
    }
  }
  async changepassword(
    id: number,
    password: string,
    newpassword: string
  ): Promise<User> {
    // try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new Error("user not found");
    }
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("password is invalid");
    }

    const hashedpassword = bcrypt.hashSync(
      newpassword + bcrypt_code,
      parseInt(saltRounds)
    );

    const result = await prisma.user.update({
      where: { id: Number(id) || undefined },
      data: { password: hashedpassword },
    });
    return result;
  }
}
