import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://blinkit-api-mv1f.onrender.com",
});
export default instance;
