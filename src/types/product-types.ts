export interface Product {
  id: number;
  title: string;
  sku: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  rating: number;
  reviews: { id: number; comment: string }[];
  availabilityStatus: string;
  thumbnail: string;
  meta: {
    createdAt: string;
  };
}
