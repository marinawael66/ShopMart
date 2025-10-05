import { ProductI } from "./product"

export interface WishlistRes {
  status: string
  count: number
  data: ProductI[]
}