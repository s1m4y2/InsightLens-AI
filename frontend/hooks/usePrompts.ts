import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function usePrompts() {
  return useQuery({
    queryKey: ["prompt-modules"],
    queryFn: async () => {
      const { data } = await api.get("/prompt");
      return data as string[];
    },
  });
}