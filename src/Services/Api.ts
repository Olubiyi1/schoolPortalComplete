import axios from "axios";

const API_URL = "my backend server url"

export const registerUser = async (userData:any)=>{
    const response= await axios.post(`${API_URL}/users.register`, userData)
    return response.data
}

export const loginUser = async(credentials:any)=>{
    const response = await axios.get(`${API_URL}/users/login`, credentials)
    return response.data
}