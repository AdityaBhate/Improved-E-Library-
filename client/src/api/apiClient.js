import axios from "axios";

axios.defaults.withCredentials = true;
const apiClient = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-type": "application/json"
    }
});

export const logInPostRequest = async (username, password) => {
    const response = await apiClient.post(`/user/login`, {
        username: username,
        password: password,
    });

    return response.data
}

export const searchBookRequest = async (name, branch, category) => {
    const url = new URL("http://localhost:3001/search");
    url.searchParams.set("name", name)
    url.searchParams.set("branch", branch)
    url.searchParams.set("category", category)

    const response = await axios.get(url)

    return response.data
}

export const deleteBookRequest = async (_id) => {
    const response = apiClient.get(`/delete/${_id}`)

    return response
}