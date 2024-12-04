export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
available: any;
  id: number;
  name: string;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: Rating;
  quantity?: number;
}
