import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export type Task = {
  id?: number;
  title: string;
  description: string | null;
  isDone: boolean;
  AssignedUserId: number | null;
};

export class TaskStore {
  async index(userid: number): Promise<Task[]> {
    try {
      const result = await prisma.task.findMany({
        where: {
          AssignedUserId: userid,
        },
      });
      return result;
    } catch (error) {
      throw new Error(`Cannot get task ${error}`);
    }
  }
  async show(id: number): Promise<Task | null> {
    try {
      const result = await prisma.task.findUnique({
        where: {
          id: Number(id),
        },
      });
      return result;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(task: Task): Promise<Task> {
    try {
      const result = await prisma.task.create({
        data: task,
      });
      return result;
    } catch (err) {
      throw new Error(
        `Could not add new task ${task.id} ${task.title} . Error: ${err}`
      );
    }
  }
  async update(id: number, task: Task): Promise<Task> {
    try {
      const result = await prisma.task.update({
        where: { id: Number(id) || undefined },
        data: task,
      });
      return result;
    } catch (err) {
      throw new Error(
        `Could not update task ${id} ${task.title}. Error: ${err}`
      );
    }
  }
  async delete(id: number): Promise<Task> {
    try {
      const result = await prisma.task.delete({
        where: {
          id: Number(id),
        },
      });
      return result;
    } catch (err) {
      throw new Error(`Could not delete task ${id}. Error: ${err}`);
    }
  }
}
