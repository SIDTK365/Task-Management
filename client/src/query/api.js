import axios from "axios";
import { getToken, getId } from "../utility/getToken";

const baseURL = "http://localhost:8080/api/v1";

export async function logInFunction(requestBody) {
  const response = await axios.post(
    `${baseURL}/sign-in`,
    JSON.stringify(requestBody),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}

export async function signUpFunction(requestBody) {
  const response = await axios.post(
    `${baseURL}/sign-up`,
    JSON.stringify(requestBody),
    {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}

export async function getallTasks() {
  const token = getToken();
  const id = getId();
  const response = await axios.get(`${baseURL}/get-all-tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
      id: id, // Pass the id as a header
    },
  });
  return response.data;
}

export async function createTask(requestBody) {
  const token = getToken();
  const id = getId();
  const response = await axios.post(`${baseURL}/create-task`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: id,
    },
  });
  return response.data;
}

export async function deleteTask(taskId) {
  const token = getToken(); // Assuming this function retrieves the authentication token
  const response = await axios.delete(`${baseURL}/delete-tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
