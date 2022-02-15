import axios from "axios";
const API_URL = "http://localhost:3000/";
class AuthService {
  login(email: string, password: string): object {
    return axios
      .post(API_URL + "signin", { email, password })
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
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username: string, email: string, password: string) {
    return axios
      .post(API_URL + "signup", {
        username,
        email,
        password,
      })
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
  }
}
export default new AuthService();
