import { useState } from "react";
import { productItems } from "../productItems";
import Pagination from "./Pagination";
import pointer from "../modules/pointer";
import Card from "./Card";
import "../style/CardList.css";

function CardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // 현재 페이지에 들어갈 상품데이터
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productItems.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 전환
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  // 상품데이터 스코어 기준 내림차순 정렬
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
