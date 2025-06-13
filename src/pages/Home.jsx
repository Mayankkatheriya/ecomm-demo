import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const Home = () => {
  const [productData, setProductData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/product/list");
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to EComm
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your one-stop shop for all your shopping needs. Browse our extensive
            collection of products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
