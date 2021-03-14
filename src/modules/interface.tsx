export interface CardProps {
  title: string;
  coverImage: string;
  price: string;
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
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

export interface BillProps {
  coupon: string;
  setCoupon: (coupon: string) => void;
  couponApplied: boolean;
  setCouponApplied: (boolean: boolean) => void;
  totalPrice: number;
}