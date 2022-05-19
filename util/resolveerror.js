export const getError = (response) => {
  let err = Object.entries(response);
  let errResponse = [];
  for (let i = 0; i < err.length; i++) {
    let obj = {
      type: err[i][0],
      message: err[i][1][0],
    };
    errResponse.push(obj);
  }
  return errResponse;
};

export const BASE_URL = "http://localhost:8000/api/v2"
