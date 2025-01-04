export interface Cart {
  id: number;
  products: { productsId: string; quantity: string }[];
  date: string;
  userId: number;
}
