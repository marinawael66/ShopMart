import { Item } from "./cart";
import { UserI } from "./login";

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: UserI;
  cartItems: Item[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}
export interface ShippingAddress {
  details: string;
  city: string;
  phone?: string;
}
