export type SearchItem = {
  order: number;
  operator: string;
  queryKey: string;
  queryValue: string;
  id?: string;
  isFirst?: boolean;
  queryType: string;
};

export type SearchQuery = {
  condition: string;
  items: SearchItem[];
};
