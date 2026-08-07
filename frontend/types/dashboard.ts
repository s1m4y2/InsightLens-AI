export interface CountItem {
  label: string;
  count: number;
}

export interface RecentReview {
  id: number;
  review_text: string;
  summary: string;
  sentiment: string;
  emotion: string;
  created_at: string;
}

export interface DashboardResponse {
  total_reviews: number;
  positive: number;
  negative: number;
  mixed: number;
  top_emotions: CountItem[];
  top_categories: CountItem[];
  recent_reviews: RecentReview[];
}