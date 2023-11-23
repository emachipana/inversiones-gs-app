import { API_BASE_URI, TOKEN_KEY } from "../config.js";

async function apiFetch(endpoint, { method, headers, body } = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  if(token) {
    headers = {
      "x-access-token": token,
      ...headers
    }
  }

  if(body) {
    headers = {
      "Content-Type": "application/json",
      ...headers
    }
  }

  const config = {
    method: method || ( body ? "POST" : "GET" ),
    headers,
    body: body ? JSON.stringify(body) : null
  }

  const response = await fetch(`${API_BASE_URI}/${endpoint}`, config);

  let data;
  if(!response.ok) {
    try {
      data = await response.json();
    }catch(e) {
      console.error(e);

      throw new Error(response.statusText);
    }

    throw new Error(JSON.stringify(data.message));
  }

  try {
    data = await response.json();
  }catch(e) {
    console.error(e);

    data = response.statusText;
  }

  return data;
}

export default apiFetch;
