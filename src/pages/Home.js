import Banner from "../components/Banner";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const Home = ({ products }) => {
  return (
    <div className="home" id="top">
      <Banner />
      <ProductGrid products={products} />
      <Footer />
    </div>
  );
};

export default Home;
