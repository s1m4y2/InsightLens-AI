import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export function useAnalyzeReview() {
    return useMutation({

        mutationFn: async (review: string) => {

            const { data } = await api.post(
                "/reviews/analyze",
                {
                    review,
                }
            );

            return data;
        },

    });
}