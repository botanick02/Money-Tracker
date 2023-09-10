import { store } from "../store/store";
import { RefreshAccessToken } from "./queries/Auth";

// const baseURL = "https://localhost:7299/graphql";
const baseURL = "https://money-tracker.railway.internal/graphql"


export const request = async (query?: string, variables?: any) => {
  if (!query) return;

  const result = await runFetch(query, variables);

  if (!isTokenError(result.errors)) {
    
    return result;
  }

  // consecutiveErrors++;

  // if (consecutiveErrors >= 2) {
  //   return {
  //     data: null,
  //     errors: [{ message: "REFRESH_ERROR", extensions: { code: "REFRESH_ERROR" } }],
  //   };
  // }

  
  const token = await refreshToken();

  if (token) {
    localStorage.setItem("accessToken", token);

    return await runFetch(query, variables);
  } else {
    return {
      data: null,
      errors: [{ message: "REFRESH_ERROR", extensions: { code: "REFRESH_ERROR" } }],
    };
  }
};

const isTokenError = (errors: any) => {
  return (
    Array.isArray(errors) &&
    errors.length > 0 &&
    errors[0].extensions.code === "ACCESS_DENIED"
  );
};

const runFetch = async (query?: string, variables?: any) => {
  var state = store.getState();
  var params = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
      TimeTravelDateTime: state.TimeTravel.datetime ?? "",
    },
    body: JSON.stringify({ query, variables }),
  };

  const response = await fetch(baseURL, params);
  return await response.json();
};

const refreshToken = async () => {
  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: RefreshAccessToken }),
  });
  const result = await response.json();

  if (result.data.auth.refreshToken?.accessToken) {
    console.log(result.data.auth.refreshToken.accessToken, "token");
    return result.data.auth.refreshToken.accessToken;
  } else {
    localStorage.removeItem('accessToken');
    return "";
  }
};

export const requestWithAuth = async (query?: string, variables?: any) => {
  if (!query) return;

  const result = await runFetch(query, variables);

  if (!isTokenError(result.errors)) {

    return result;
  }


  const token = await refreshToken();

  if (token) {
    localStorage.setItem("accessToken", token);

    return await runFetch(query, variables);
  } else {
    return {
      data: null,
      errors: [{ message: "REFRESH_ERROR", extensions: { code: "REFRESH_ERROR" } }],
    };
  }
};
