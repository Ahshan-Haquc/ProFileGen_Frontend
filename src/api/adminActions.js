import toastShow from "../utils/toastShow";
import axiosInstance from "./axiosInstance";

export const deleteUser =async (userId)=>{
    try {
        const response = await axiosInstance.delete(`/admin/deleteUser/${userId}`);
        if(response.data.success){
            toastShow("User account deleted succesfully.", "success");
        }else{
            toastShow("User account not deleted.", "error");
        }
    } catch (error) {
        alert("error");
    }
}

export const blockUser = async (userId)=>{
    try {
        const response = await axiosInstance.patch(`/admin/blockUser/${userId}`);
        if(response.data.success){
            toastShow("User account blocked succesfully.", "success");
        }else{
            toastShow("User account not blocked.", "error");
        }
    } catch (error) {
        alert("error");
    }
}
export const unblockUser = async (userId)=>{
    try {
        const response = await axiosInstance.patch(`/admin/unblockUser/${userId}`);
        if(response.data.success){
            toastShow("User account unblocked succesfully.", "success");
        }else{
            toastShow("User account not unblocked.", "error");
        }
    } catch (error) {
        alert("error");
    }
}