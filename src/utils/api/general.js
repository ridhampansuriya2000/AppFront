import axios from "axios";

const defaultHeaders = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

export const defaultAxios = axios.create({});

export function apiClient({
  url,
  data = {},
  method = "POST",
  headers = {},
  noHeaders,
  ...rest
}) {
  return new Promise((resolve, reject) => {
    defaultAxios({
      method,
      url,
      headers: {
        ...(noHeaders ? {} : defaultHeaders),
        ...headers,
      },
      data,
      ...rest,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          reject(err.response.data.error);
        } else {
          reject(err);
        }
      });
  });
}
