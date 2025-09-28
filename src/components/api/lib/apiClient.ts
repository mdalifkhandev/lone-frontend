import axios from "axios";

const clientAPI=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL || 'https://loan-server-jvrk.onrender.com/api/v1',
    withCredentials:true,
})
export default clientAPI;