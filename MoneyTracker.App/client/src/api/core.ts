import { REFRESH_ACCESS_TOKEN_ERROR } from "../store/Auth/Auth.slice";
import { store } from "../store/store";

const baseURL = "https://localhost:7299/graphql";
// const baseURL = "https://money-tracker.livelymeadow-ee48f402.australiaeast.azurecontainerapps.io/graphql"
export const request = async (query?: string, variables?: any) => {
  if (!query) return;
  const result = await runFetch(query, variables);

  if (!isTokenError(result.errors)) {
    return result;
  }
  const token = await refreshToken();
  console.log(token);
  localStorage.setItem("accessToken", token);

  return await runFetch(query, variables);
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
    body: JSON.stringify({ query:RefreshAccessToken }),
  });
  const result = await response.json();
  console.log( result.data.auth.refreshToken.accessToken, "token");
  return result.data.auth.refreshToken.accessToken
};
export const requestWithAuth = async (query?: string, variables?: any) => {};
