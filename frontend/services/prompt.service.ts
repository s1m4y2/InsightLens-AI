import api from "@/lib/api";

export const PromptService = {

    async getModules() {

        const { data } = await api.get("/prompt");

        return data;

    },

    async getVersions(module: string) {

        const { data } = await api.get(`/prompt/${module}`);

        return data;

    },

    async getPrompt(

        module: string,

        version: string

    ) {

        const { data } = await api.get(

            `/prompt/${module}/${version}`

        );

        return data;

    }

};