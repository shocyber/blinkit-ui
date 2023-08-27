import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://blinkit-api-2x5r.onrender.com",
});
export default instance;
