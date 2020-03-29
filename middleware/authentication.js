import axios from 'axios'
export default function ({ store, error }) {
  return axios.get("/v1/user", {
    progress: false
  })
  .then( (response) => {
    // handle success
    if (response.data.data.isAdministrator) {
      return;
    } else {
      error({
        message: 'You must log in as an administrator to view this page',
        statusCode: 403
      })
    }
  })
  .catch((er) => {
    error({
      message: 'You must log in as an administrator to view this page',
      statusCode: 403
    })
  })
}
