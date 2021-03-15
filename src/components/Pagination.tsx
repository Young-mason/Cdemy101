import { PaginationProps } from "../modules/interface";
import { GrNext, GrPrevious, GrPrint } from "react-icons/gr";
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
      <button
        className="page-btn"
        onClick={() => {
          if (currentPage > 1) {
            paginate(currentPage - 1, "right");
          }
        }}
      >
        <GrPrevious />
      </button>
      {/* 페이지 목록을 출력해줍니다 */}
      {pageNumbers.map((num: number) => (
        <li key={num} className="page-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              if (num > currentPage) {
                paginate(num, "left");
              }
              if (num < currentPage) {
                paginate(num, "right");
              }
            }}
            className="page-link"
            style={currentPage === num ? { color: "black" } : {}}
          >
            {num}
          </a>
        </li>
      ))}
      <button className="page-btn">
        <GrNext
          onClick={() => {
            if (currentPage < pageNumbers.length) {
              paginate(currentPage + 1, "left");
            }
          }}
        />
      </button>
    </div>
  );
}

export default Pagination;
