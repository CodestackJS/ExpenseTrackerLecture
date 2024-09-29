//create all functions for all components in this file

import axios from "axios";
import { BASE_URL } from "../constant";





const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

    const createAccount = async (createduser:) =>
    {
       axios.post(BASE_URL + "User/AddUsers", createduser)
    }

const login = async (loginUser) =>
    {
       
    }

const GetLoggedInUser = async (username) => {
    let result = await fetch('')
    userData = await result.json();
    console.log(userData, "getloggedinuser method")
    localStorage.setItem("UserData", JSON.stringify(userData))
}








export {checkToken,createAccount,login,GetLoggedInUser,LoggedInData,sendData,AddBlogItems,getBlogItems,GetItemsByUserId, updateBlogItems, getPublishedBlogItems}