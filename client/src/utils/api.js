import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

async function handleRequest(req) {
  try {
    return await req;
  } catch (error) {
    return { statusText: "ERROR", message: error.message };
  }
}

export const get = (url) => handleRequest(api.get(url));
export const post = (url, data = {}) => handleRequest(api.post(url, data));
