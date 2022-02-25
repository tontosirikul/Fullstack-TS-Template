import AuthHeader from "./AuthHeader";
import axios from "axios";
const API_URL = "http://localhost:3000/";
class TaskService {
  getUserTask(userid: number) {
    return axios
      .get(API_URL + `tasksbyuser/${userid}`, {
        headers: {
          Authorization: `${AuthHeader().Authorization}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(
          error.response.data.message ? error.response.data.message : "Error"
        );
      });
  }
  get(id: number) {
    return axios
      .get(API_URL + `/tasks/${id}`, {
        headers: {
          Authorization: `${AuthHeader().Authorization}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(
          error.response.data.message ? error.response.data.message : "Error"
        );
      });
  }
  create({
    title,
    description,
    isDone,
    userid,
  }: {
    title: string;
    description: string;
    isDone: boolean;
    userid: number;
  }) {
    return axios
      .post(
        API_URL + "tasks",
        {
          title,
          description,
          isDone,
          userid,
        },
        {
          headers: {
            Authorization: `${AuthHeader().Authorization}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(
          error.response.data.message ? error.response.data.message : "Error"
        );
      });
  }
  update({
    id,
    title,
    description,
    isDone,
    userid,
  }: {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    userid: number;
  }) {
    return axios
      .put(
        API_URL + `tasks/${id}`,
        { title, description, isDone, userid },
        {
          headers: {
            Authorization: `${AuthHeader().Authorization}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(
          error.response.data.message ? error.response.data.message : "Error"
        );
      });
  }
  delete(id: number) {
    return axios
      .delete(API_URL + `tasks/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        throw new Error(
          error.response.data.message ? error.response.data.message : "Error"
        );
      });
  }
}

export default new TaskService();
