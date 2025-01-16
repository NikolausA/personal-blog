export const request = async (url, method, data) => {
  const token = localStorage.getItem("token");

  let headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(data instanceof FormData)) {
    headers["content-type"] = "application/json";
  }

  return fetch(url, {
    headers: headers,
    method: method || "GET",
    body: data
      ? data instanceof FormData
        ? data
        : JSON.stringify(data)
      : undefined,
  }).then((res) => res.json());
};
