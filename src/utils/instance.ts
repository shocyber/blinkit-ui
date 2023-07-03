import axios from "axios";
const instance = axios.create({
  baseURL: "https://blinkit-api-mv1f.onrender.com",
});
export default instance;
