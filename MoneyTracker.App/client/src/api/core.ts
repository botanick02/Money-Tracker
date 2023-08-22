import { useAppDispatch } from "../hooks/useAppDispatch";
import { TOKEN_EXPIRE } from "../store/Auth/Auth.slice";
import { checkTokenExpire } from "../tools/checkTokenExpire"
const dispatch = useAppDispatch();

const baseURL = "https://localhost:7299/graphql"

export const request = async (query?: string, variables?: any) => {
    dispatch(TOKEN_EXPIRE(checkTokenExpire()))


    if(!query)
        return

    return (await fetch(baseURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken") 
        },
        body: JSON.stringify({query, variables})
    })).json()
}

export const requestWithAuth = async (query?: string, variables?: any) => {


}