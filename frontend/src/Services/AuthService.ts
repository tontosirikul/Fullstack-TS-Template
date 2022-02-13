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
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
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
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
export default new AuthService();
