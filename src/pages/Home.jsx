import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../store/slices/productSlice";
import { fetchCartData } from "../store/slices/cartSlice";

const formInitialState = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: -1,
  stock: 0,
  brand: "",
  category: "",
  thumbnail: "",
  images: [""],
};

const Home = () => {
  // const [productData, setProductData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(formInitialState);
  const { productData, loading, totalItems } = useSelector(
    (store) => store.products
  );

  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  // const fetchData = async () => {
  //   try {
  //     const response = await axiosInstance.get("/api/v1/product/list");
  //     setProductData(response.data.results);
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stock" ||
        name === "discountPercentage" ||
        name === "rating"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/api/v1/product/create",
        formData
      );
      console.log("Created:", response.data);
      // fetchData(); // refresh the list
      dispatch(fetchProductData({ pageNo: currentPage, pageSize: pageSize }));
      setFormData(formInitialState);
      setShowForm(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    // fetchData();

    dispatch(fetchProductData({ pageNo: currentPage, pageSize: pageSize }));
  }, [currentPage]);

  const addToCart = async (id) => {
    try {
      const payload = {
        productId: id,
        qty: 1,
      };
      await axiosInstance.post("/api/v1/cart/add", payload);
      dispatch(fetchCartData());
    } catch (err) {
      console.log(err.messgae);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Create Product
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-10 max-w-2xl mx-auto space-y-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Create New Product
            </h2>

            {["title", "description", "brand", "category", "thumbnail"].map(
              (field) => (
                <div key={field}>
                  <label className="block text-gray-700">{field}</label>
                  <input
                    name={field}
                    type="text"
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border rounded px-3 py-2"
                  />
                </div>
              )
            )}

            {["price", "discountPercentage", "rating", "stock"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700">{field}</label>
                <input
                  name={field}
                  type="number"
                  value={formData[field]}
                  onChange={handleInputChange}
                  required={
                    field !== "discountPercentage" && field !== "rating"
                  }
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </div>
            ))}

            <div>
              <label className="block text-gray-700">Images</label>
              {formData.images.map((img, index) => (
                <input
                  key={index}
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="mt-1 block w-full border rounded px-3 py-2 mb-2"
                  placeholder={`Image URL ${index + 1}`}
                />
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-sm text-blue-500 underline"
              >
                Add More Images
              </button>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {productData.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              Our Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productData.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.category}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.brand}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-indigo-600 font-semibold text-lg">
                        ₹{product.price}
                      </span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        ⭐ {product.rating}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mt-2">
                      In Stock: {product.stock}
                    </p>

                    {product.images?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-800 font-medium mb-1">
                          More Images:
                        </p>
                        <div className="flex overflow-x-auto gap-2">
                          {product.images.map((imgUrl, idx) => (
                            <img
                              key={idx}
                              src={imgUrl}
                              alt={`product-${idx}`}
                              className="h-20 w-20 object-cover rounded border"
                            />
                          ))}
                        </div>
                        <button
                          className="text-center outline-none bg-blue-600 text-white mt-2 w-full p-2 cursor-pointer"
                          onClick={() => addToCart(product._id)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {productData.length > 0 && (
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded border ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            <span className="px-4 py-2 border rounded text-gray-700">
              Page {currentPage}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 rounded border bg-white text-gray-700 hover:bg-gray-100"
              disabled={currentPage * pageSize >= totalItems}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
