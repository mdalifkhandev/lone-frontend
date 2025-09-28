import { useQuery } from "@tanstack/react-query"
import clientAPI from "../lib/apiClient"

export const useGetUser=(email:string)=>{
    return useQuery({
        queryKey:["user",email],
        queryFn:async()=>{
            const response= await clientAPI.get(`/user/me?email=${email}`)
            return response
        },
        enabled:!!email
    })
}

