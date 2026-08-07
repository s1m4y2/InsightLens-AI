import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

interface Params {
    page: number;
    search: string;
    sentiment: string;
    emotion: string;
    category: string;
}

export function useReviews({
    page,
    search,
    sentiment,
    emotion,
    category,
}: Params){

    return useQuery({
        
        queryKey:[
            "reviews",
            page,
            search,
            sentiment,
            emotion,
            
        ],
        placeholderData: (previousData) => previousData,
        queryFn:async()=>{

            const {data}=await api.get("/reviews",{

                params:{

                    page,

                    page_size:10,

                    search: search || undefined,

                    sentiment:
                        sentiment==="All"
                            ? undefined
                            : sentiment,

                    emotion:
                        emotion==="All"
                            ? undefined
                            : emotion,

                    category:
                        category==="All"
                            ? undefined
                            : category,

                    sort:"id",

                    order:"desc"

                }

            });

            return data;

        }

    });

}