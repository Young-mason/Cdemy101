export interface CardProps {
  title: string;
  coverImage: string;
  price: string;
}

export interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: any;
}
