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
  title: string;
  coverImage: string;
  price: number;
  availableCoupon?: boolean;
}
