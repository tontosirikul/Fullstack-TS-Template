import axios from "axios";
import AuthHeader from "./AuthHeader";
const API_URL = "http://localhost:3000/user";
class UserService {
  changeProfileData = ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    return axios.put(API_URL + "user", {
      headers: AuthHeader() || undefined,
    });
  };
}
export default new UserService();
