import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function usePrompt(
    module?: string,
    version?: string
) {
    return useQuery({

        queryKey: [
            "prompt",
            module,
            version
        ],

        enabled: !!module && !!version,

        queryFn: async () => {

            const { data } = await api.get(
                `/prompt/${module}/${version}`
            );

            return data;

        }

    });
}