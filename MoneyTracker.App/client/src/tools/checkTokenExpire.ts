import { AccessToken } from "../types/GraphQLType";


export const checkTokenExpire = (): boolean => {
    let token = localStorage.getItem("accessToken");
    if (!token) {
        return true;
    }
    let dateExp = new Date(timeConverter(parseJwt(token).exp));
  
    return dateExp.valueOf() < new Date().valueOf();
};

export const parseJwt = (token: string): AccessToken => {
    if (!token) {
        return { exp: 0, iat: 0, nbf: 0, UserId: "" };
    }
    let base64Url = token.split(".")[1];
    let base64 = decodeURIComponent(
        atob(base64Url)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(base64);
};

const timeConverter = (UNIX_timestamp: number): string => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
};