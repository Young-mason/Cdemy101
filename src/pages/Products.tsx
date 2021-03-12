import Navbar from "../components/Navbar";
import CardList from "../components/CardList";
import "../style/Products.css";

function Products() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="billboard">
        <img
          src="https://img-a.udemycdn.com/notices/web_banner/image_udlite/354150cd-5c0f-4be1-8159-b8243d81f900.jpg?DO_8F9ufrOV7MUml0v6LbwZ4Y-R1c6oR6bbiMRG9RN8toIKYT9K3mOvuzi68AN8n7uAKvAZ3LwVOrpRak51WTQQNKaPx4K9Rb8VAEnxo5o-XJbowiO2W5pCirRqOImwjzVMLCnssuInDSIitnxFkkhn5bjeAKQUch2u65o3BCbLRWgzTX4EM"
          alt="no0img"
        />
      </div>
      <h1>Let's start Learning, Mason!</h1>
      <CardList></CardList>
    </div>
  );
}

export default Products;
