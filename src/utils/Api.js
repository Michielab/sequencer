import Axios from "axios";

// const url = "http://localhost:3001/";

function Api() {
  console.log("bla bla");
  Axios.get("/auth/login")
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      //   console.log(error);
    });
}

export default { Api };
