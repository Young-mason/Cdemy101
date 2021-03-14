import { useState } from "react";
import { productItems } from "../productItems";
import Pagination from "./Pagination";
import pointer from "../modules/pointer";
import Card from "./Card";
import "../style/CardList.css";

function CardList() {
  /* 한 페이지당 5개씩 들어가도록 페이지를 계산합니다 */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productItems.slice(indexOfFirstItem, indexOfLastItem);

  /* 상품 페이지를 이동시킵니다 */
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  /* 상품데이터를 Score 기준으로 내림차순 정렬합니다 */
  productItems.sort((a, b) => b.score - a.score);

  return (
    <>
      {/* 현재 페이지에 나타날 데이터를 Card 컴포넌트와 매핑 */}
      <div className="card-list">
        {currentItems.map((item) => {
          const { id, title, coverImage, price } = item;
          return (
            <Card
              key={id}
              item={item}
              title={title}
              coverImage={coverImage}
              price={`₩ ${pointer(price)}`} /* 세 자리수 마다 콤마 찍기 */
            />
          );
        })}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={productItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}

export default CardList;
