import { useMutation, useQuery } from "@tanstack/react-query"
import clientAPI from "../lib/apiClient"
import { applyLoneFrom } from "@/components/interface/profile"


export const useApplyLone=()=>{
    return useMutation({
        mutationFn:async(data:applyLoneFrom)=>{
            const response= await clientAPI.post('/lone/apply',data)
            return response
        }
    })
}

export const useGetApplyLone=(email:string)=>{
    return useQuery({
        queryKey:['getApplyLone'],
        queryFn:async()=>{
            const response= await clientAPI.get(`/lone?email=${email}`)
            return response.data
        },
        enabled:!!email
    })
}

export const useApproveLone=()=>{
    return useMutation({
        mutationFn:async(data:applyLoneFrom)=>{
            const response= await clientAPI.patch('/lone/approve',data)
            return response
        },
    })
}

export const useGetSingleLone=(id:string,email:string)=>{
    return useQuery({
        queryKey:['getSingleLone', id,email],
        queryFn:async({queryKey})=>{
            const [,id,email]=queryKey
            console.log(queryKey)
            const response= await clientAPI.get(`/lone/${id}?email=${email}`)
            return response
        },
        // enabled: !!id && !!email,
    })
}