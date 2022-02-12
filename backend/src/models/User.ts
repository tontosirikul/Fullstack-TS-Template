import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

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
  async update(id: number, user: User): Promise<User> {
    try {
      const password = bcrypt.hashSync(
        user.password + bcrypt_code,
        parseInt(saltRounds)
      );
      const email: string = user.email;
      const username: string = user.username;
      const result = await prisma.user.update({
        where: { id: Number(id) || undefined },
        data: { email, username, password },
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
  async authenticate(email: string, password: string): Promise<User | null> {
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
}
