import { useQuery } from "@tanstack/react-query";

import { DashboardService } from "@/services/dashboard.service";

export function useDashboard() {

    return useQuery({

        queryKey:["dashboard"],

        queryFn: DashboardService.getDashboard

    });

}