import { CardProps } from "../modules/interface";

function Card({ title, coverImage, price }: CardProps) {
  return (
    <div className="card">
      <img className="card-img" src={coverImage} alt="no-img" />
      <h4 className="card-title">{title}</h4>
      <h3 className="card-price">{price}</h3>
    </div>
  );
}

export default Card;
