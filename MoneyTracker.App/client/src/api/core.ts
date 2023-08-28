import { store } from "../store/store";

// const baseURL = "https://localhost:7299/graphql"
const baseURL = "https://money-tracker.livelymeadow-ee48f402.australiaeast.azurecontainerapps.io/graphql"
export const request = async (query?: string, variables?: any) => {
 


    if(!query)
        return

    var state = store.getState();

    return (await fetch(baseURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
            'TimeTravelDateTime': state.TimeTravel.datetime ?? ""
        },
        body: JSON.stringify({query, variables})
    })).json()
}

export const requestWithAuth = async (query?: string, variables?: any) => {


}