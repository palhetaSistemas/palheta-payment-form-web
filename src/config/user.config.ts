import { api } from "@/src/config/axios.config";
import { User } from "../@staticData/user";
export const registerUser = async (data: User) => {
  try {
    const response = await api.post("/user/register", data);

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
