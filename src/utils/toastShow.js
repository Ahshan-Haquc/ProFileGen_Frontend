import {  toast } from 'react-toastify';
const toastShow = (message, type) => {
        const values = {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        };

        if (type === "error") {
            toast.error(message, values);
        } else {
            toast.success(message, values);
        }
    }

export default toastShow;