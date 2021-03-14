import { VoidExpression } from "typescript";
import { Item } from "./CartContext";

export interface CardProps {
  title: string;
  coverImage: string;
  price: string;
  item: Item;
}

export interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export interface CartItemsProps {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  availableCoupon?: boolean;
}

export interface BillProps {
  coupon: string;
  setCoupon: (coupon: string) => void;
}

export interface ModalProps {
  setModal: (boolean: boolean) => void;
  addable: boolean;
  item: Item;
}
