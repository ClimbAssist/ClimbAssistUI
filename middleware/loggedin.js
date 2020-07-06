import axios from "axios";
export default function ({ redirect }) {
  return axios
    .get("/v1/user", {
      progress: false,
    })
    .catch((er) => {
      redirect("/user/login");
    });
}
