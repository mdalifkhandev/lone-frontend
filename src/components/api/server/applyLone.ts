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

export const useGetApplyLone=()=>{
    return useQuery({
        queryKey:['getApplyLone'],
        queryFn:async()=>{
            const response= await clientAPI.get('/lone')
            return response.data
        }
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

export const useGetSingleLone=(id:string)=>{
    return useQuery({
        queryKey:['getSingleLone', id],
        queryFn:async()=>{
            const response= await clientAPI.get(`/lone/${id}`)
            return response
        },
        enabled:!!id
    })
}