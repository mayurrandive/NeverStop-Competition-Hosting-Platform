import axios from "axios";
import { setAccessToken, logout } from "./Redux/AuthSlice";
import store from "./Redux/Store";

const dispatch = store.dispatch;

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Function to handle token refresh
    const refreshToken =
      store.getState().auth.refreshToken ||
      localStorage.getItem("refreshToken");

    const handleTokenRefresh = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/user/refresh/",
          { refresh: refreshToken }
        );
        dispatch(setAccessToken(response.data.access));

        // Re-run the original request that was intercepted
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axios(originalRequest);
      } catch (err) {
        dispatch(logout());
        console.log(err);
        return Promise.reject(err); // Reject the promise after logging the error
      }
    };

    if (error.response.status === 401 && refreshToken) {
      return handleTokenRefresh();
    }

    // Return the original error if it's not a 401 or there's no refresh token
    return Promise.reject(error);
  }
);

export default axiosInstance;
