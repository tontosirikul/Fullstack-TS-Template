import AuthHeader from "./AuthHeader";
import axios from "axios";

const API_URL = "http://localhost:3000/";
class UserService {
  changeProfileData = ({
    id,
    username,
    email,
  }: {
    id: number;
    email: string;
    username: string;
  }) => {
    return axios
      .put(
        API_URL + `users/${id}`,
        { email, username },
        {
          headers: {
            Authorization: `${AuthHeader().Authorization}`,
          },
        }
      )
      .then((response) => {
        if (response.data.userwithtoken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(
          error.response.data.message ? error.response.data.message : "Error"
        );
      });
  };
  changePassword = ({
    id,
    oldpassword,
    newpassword,
  }: {
    id: number;
    oldpassword: string;
    newpassword: string;
  }) => {
    return axios
      .put(
        API_URL + `users/changepassword/${id}`,
        { oldpassword, newpassword },
        {
          headers: {
            Authorization: `${AuthHeader().Authorization}`,
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(
          error.response.data.message ? error.response.data.message : "Error"
        );
      });
  };
}
export default new UserService();
