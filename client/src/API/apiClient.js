const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
});


const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Server error");
  return data;
};

export const get = async (path) => {
  const res = await fetch(`${BASE_URL}${path}`, { headers: getHeaders() });
  return handleResponse(res);
};

export const post = async (path, body) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body)
  });
  return handleResponse(res);
};

export const put = async (path, body) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(body)
  });
  return handleResponse(res);
};

export const postForm = async (path, formData) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData
  });
  return handleResponse(res);
};

export const putForm = async (path, formData) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData
  });
  return handleResponse(res);
};

export const del = async (path) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  return handleResponse(res);
};
