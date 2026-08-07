import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export function useDeleteReview() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (id:number) => {

            await api.delete(`/reviews/${id}`);

        },

        onSuccess:()=>{

            queryClient.invalidateQueries({

                queryKey:["reviews"]

            });

        }

    });

}