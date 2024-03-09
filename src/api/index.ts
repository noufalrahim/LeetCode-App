import { API } from "../../util/AppConstants";

export default async function UserInfo(userName: string) {
    try {
        const response = await fetch(API.BASE_URL + userName);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}