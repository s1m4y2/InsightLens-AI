"use client";

import { useEffect, useState } from "react";

import { BusinessService } from "@/services/business.service";

import { BusinessInsights } from "@/types/business";

export function useBusinessInsights() {

    const [data, setData] =
        useState<BusinessInsights>();

    const [isLoading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(false);

    useEffect(() => {

        BusinessService
            .getInsights()

            .then(setData)

            .catch(() => setError(true))

            .finally(() => setLoading(false));

    }, []);

    return {

        data,

        isLoading,

        error

    };

}