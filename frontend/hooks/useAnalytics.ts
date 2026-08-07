"use client";

import { useQuery } from "@tanstack/react-query";

import { AnalyticsService } from "@/services/analytics.service";

export function useAnalytics() {

    return useQuery({

        queryKey:["analytics"],

        queryFn:AnalyticsService.getAnalytics

    });

}