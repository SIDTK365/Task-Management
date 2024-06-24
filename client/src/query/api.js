import axios from "axios";
import { getToken, getId } from "../utility/getToken";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function logInFunction(requestBody) {
  console.log(baseURL, process.env);
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

export async function updateTask(taskId, requestBody) {
  const token = getToken();
  const id = getId();
  const response = await axios.put(
    `${baseURL}/update-tasks/${taskId}`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: id,
      },
    },
  );
  return response.data;
}

export async function updateImportantTask(taskId) {
  const token = getToken();
  const id = getId();
  const response = await axios.put(
    `${baseURL}/update-imp-tasks/${taskId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: id,
      },
    },
  );
  return response.data;
}

export async function updateCompleteTask(taskId) {
  const token = getToken();
  const id = getId();
  const response = await axios.put(
    `${baseURL}/update-complete-tasks/${taskId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: id,
      },
    },
  );
  return response.data;
}
