import { Item } from "./CartContext";

/* 모든 인터페이스를 하나의 파일에서 export 시킵니다*/
export interface CardProps {
  title: string;
  coverImage: string;
  price: string;
  item: Item;
}

export interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number, direction: string) => void;
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
