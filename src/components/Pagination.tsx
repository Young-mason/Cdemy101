import { PaginationProps } from "../modules/interface";
import "../style/Pagination.css";

function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers: Array<number> = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pages">
      {pageNumbers.map((num: number) => (
        <li key={num} className="page-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              paginate(num);
            }}
            className="page-link"
            style={currentPage === num ? { color: "black" } : {}}
          >
            {num}
          </a>
        </li>
      ))}
    </div>
  );
}

export default Pagination;
