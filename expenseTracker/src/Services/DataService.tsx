//create all functions for all components in this file

import axios from "axios";
import { BASE_URL } from "../constant";
import { User } from "../App";




const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

    const createAccount = async (createduser: User) =>
    {
       axios
       .post(BASE_URL + "User/AddUsers", createduser)
       .then(res => res.data)
       .catch(error => error.message)
    
    }

const login = async (loginUser: User) =>
    {
       let axiosData = "";
       try
       {
        const res = await axios.post(BASE_URL + "User/Login", loginUser);
        let data = res.data
        axiosData = data.token 
        localStorage.setItem("Token", data.token)
       }
       catch(error){
        console.log(error);
       }
        return axiosData;
       
    }

const GetLoggedInUser = async (username:string) => {
    let res = await axios
    .get(BASE_URL + "User/GetUserByUsername/" + username)
    let userData = res.data;
    localStorage.setItem("UserData", JSON.stringify(userData));
}

const CreateAccount = (createdUser: User) => {
    axios
    .post(BASE_URL + "User/AddUsers", createdUser)
    .then(res => res.data)
    .catch(error => error.message)
}








export {checkToken,createAccount,login,GetLoggedInUser, CreateAccount}