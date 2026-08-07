export interface ChartItem {
    label: string;
    count: number;
}

export interface TrendItem {

    date: string;

    count: number;

}

export interface AnalyticsResponse {

    sentiment_chart: ChartItem[];

    emotion_chart: ChartItem[];

    category_chart: ChartItem[];

    keyword_chart: ChartItem[];

    review_trend: TrendItem[];

}