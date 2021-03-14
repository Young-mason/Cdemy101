import { PaginationProps } from "../modules/interface";
import "../style/Pagination.css";

function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers: Array<number> = [];

  /* 페이지 목록들을 배열에 담아줍니다 */
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pages">
      {/* 페이지 목록을 출력해줍니다 */}
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
