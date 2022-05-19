import axios from "axios";
import * as t from "../store/types";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getError } from "./resolveerror";

class Connect {
  constructor(baseurl) {
    this.baseurl = baseurl;
  }

  authenticate({ path, payload, action }) {
    return async (_dispatch) => {
      _dispatch(action());
      const data = axios.post(`${this.baseurl}${path}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      try {
        let resp = await toast.promise(data, {
          pending: "Promise is pending",
          success: "Promise resolved 👌",
          error: "Promise rejected 🤯",
        });
        if (action) {
          _dispatch({ type: t.AUTHENTICATION_SUCCESS });
        }
        const { token } = resp.data;
        Cookies.set("accessToken", token, { expires: 7 });
        window.location.replace("/account");
      } catch (error) {
        let response = error.response.data;
        let errResponse = getError(response);
        _dispatch({ type: t.AUTHENTICATIONS_ERROR, payload: errResponse });
        return { success: false };
      }
    };
  }

  get({ path, action }) {
    return async (_dispatch) => {
      _dispatch({ type: t.HANDLE_FETCHING });
      let token = Cookies.get("accessToken");
      if (token) {
        const data = axios.get(`${this.baseurl}${path}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        try {
          data.then((resp) => {
            if (action) {
              _dispatch(action(resp.data));
            }
            _dispatch({ type: t.HANDLE_SUCCESS });
          });
        } catch (error) {
          let response = error.response.data;
          let errResponse = getError(response);
          _dispatch({ type: t.HANDLE_ERROR, payload: errResponse });
        }
      }
    };
  }

  getWithNoAuthorization({ path, action }) {
    return async (_dispatch) => {
      _dispatch({ type: t.HANDLE_FETCHING });
      let token = Cookies.get("accessToken");
      const data = axios.get(`${this.baseurl}${path}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : null,
        },
      });
      try {
        data.then((resp) => {
          if (action) {
            _dispatch(action(resp.data));
          }
          _dispatch({ type: t.HANDLE_SUCCESS });
        });
      } catch (error) {
        console.log(error.response);
        let response = error.response.data;
        let errResponse = getError(response);
        _dispatch({ type: t.HANDLE_ERROR, payload: errResponse });
      }
    };
  }

  async getData({ path }) {
    let token = Cookies.get("accessToken");
    const data = await axios.get(`${this.baseurl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : null,
      },
    });
    return data
  }

  // patch request
  patch({ path, payload, action }) {
    return async (_dispatch) => {
      let token = Cookies.get("accessToken");
      if (token) {
        const data = axios.patch(`${this.baseurl}${path}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        try {
          let resp = await toast.promise(data, {
            pending: "Promise is pending",
            success: "Promise resolved 👌",
            error: "Promise rejected 🤯",
          });
          if (action) {
            _dispatch({ type: t.HANDLE_SUCCESS });
            _dispatch(action(resp.data));
          }
          return { success: true };
        } catch (error) {
          console.log(error);
          let response = error.response.data;
          let errResponse = getError(response);
          _dispatch({ type: t.HANDLE_ERROR, payload: errResponse });
          return { success: false };
        }
      } else {
        toast.error("Please you need to be logged in to perform this action");
        return { success: false };
      }
    };
  }

  // post request
  post({ path, payload, action }) {
    return async (_dispatch) => {
      let token = Cookies.get("accessToken");
      if (token) {
        const data = axios.post(`${this.baseurl}${path}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        try {
          let resp = await toast.promise(data, {
            pending: "Promise is pending",
            success: "Promise resolved 👌",
            error: "Promise rejected 🤯",
          });
          if (action) {
            _dispatch(action(resp.data));
            _dispatch({ type: t.HANDLE_SUCCESS });
          } else {
            _dispatch({ type: t.HANDLE_SUCCESS });
            // window.location.reload();
          }
          return { success: true };
        } catch (error) {
          let response = error.response.data;
          let errResponse = getError(response);
          _dispatch({ type: t.HANDLE_ERROR, payload: errResponse });
          return { success: false };
        }
      } else {
        toast.error("Please you need to be logged in to perform this action");
        return { success: false };
      }
    };
  }

  // delete request
  delete({ path, action }) {
    return async (_dispatch) => {
      let token = Cookies.get("accessToken");
      if (token) {
        const data = axios.delete(`${this.baseurl}${path}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        try {
          let resp = await toast.promise(data, {
            pending: "Promise is pending",
            success: "Promise resolved 👌",
            error: "Promise rejected 🤯",
          });
          if (action) {
            _dispatch(action(resp.data));
            _dispatch({ type: t.HANDLE_SUCCESS });
          } else {
            _dispatch({ type: t.HANDLE_SUCCESS });
            // window.location.reload();
          }
          return { success: true };
        } catch (error) {
          let response = error.response.data;
          let errResponse = getError(response);
          _dispatch({ type: t.HANDLE_ERROR, payload: errResponse });
          return { success: false };
        }
      } else {
        toast.error("Please you need to be logged in to perform this action");
        return { success: false };
      }
    };
  }
}

export default Connect;
