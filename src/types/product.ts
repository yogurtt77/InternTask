export interface Product {
  id: number | string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  isLiked?: boolean;
}
