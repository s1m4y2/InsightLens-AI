import api from "@/services/api";

export interface AILog {
    id: number;
    module: string;
    version: string;
    provider: string;
    prompt: string;
    response: string;
    execution_time_ms: number | null;
    created_at: string;
}

export async function getAILogs(): Promise<AILog[]> {

    const response = await api.get("/ai/logs");

    return response.data;
}

export async function getAILog(
    logId: number
): Promise<AILog> {

    const response = await api.get(
        `/ai/logs/${logId}`
    );

    return response.data;
}