import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function usePromptVersions(module?: string) {
  return useQuery({
    queryKey: ["prompt-versions", module],

    enabled: !!module,

    queryFn: async () => {
      const { data } = await api.get(`/prompt/${module}`);
      return data as string[];
    },
  });
}