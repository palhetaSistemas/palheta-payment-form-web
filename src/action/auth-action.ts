"use server";
import { registerUser } from "@/src/config/user.config";
import { revalidatePath } from "next/cache";
import { User } from "../@staticData/user";

export const addUser = async (data: User) => {
  const response = await registerUser(data);
  return response;
};
