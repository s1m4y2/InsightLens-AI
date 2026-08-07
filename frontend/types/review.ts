export interface Review {

    id: number;

    review_text: string;

    summary: string;

    sentiment: string;

    emotion: string;
    categories:string[];
    created_at: string;
    confidence?: number;
    keywords?: string[];
    suggested_reply?: string;
    rating?: number;
}