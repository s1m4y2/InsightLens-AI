import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useComparePrompt() {

    return useMutation({

        mutationFn: async(data:{

            module:string;

            versions:string[];

            review:string;

        })=>{

            const response = await api.post(

                "/prompt/compare",

                {

                    module:data.module,

                    versions:data.versions,

                    variables:{

                        review:data.review

                    }

                }

            );

            return response.data;

        }

    });

}