import React from "react";
import { productItems } from "../productItems";
import "../style/CardList.css";

function CardList() {
  // productItems를 Card 컴포넌트와 매핑
  return (
    <div className="card-list">
      {productItems.slice(0, 5).map((item) => {
        const { id, title, coverImage, price, score } = item;
        return (
          <Card
            key={id}
            title={title}
            coverImage={coverImage}
            price={price}
          ></Card>
        );
      })}
    </div>
  );
}

interface CardProps {
  title: string;
  coverImage: string;
  price: number;
}

function Card({ title, coverImage, price }: CardProps) {
  return (
    <div className="card">
      <img className="card-img" src={coverImage} alt="no-img" />
      <h5 className="card-title">{title}</h5>
      <p className="card-price">{price}</p>
    </div>
  );
}

export default CardList;
