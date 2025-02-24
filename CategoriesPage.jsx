import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]); // State to store categories

  async function getAllCategories() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data); // Store categories in state
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getAllCategories(); // Fetch categories when component mounts
  }, []);

  return (
    <>
      <div className="md:w-[90%] py-10 mx-auto">

        <div className="flex flex-wrap justify-center items-center py-10">
          {categories.map((category, idx) => (
            <div key={idx} className="w-full sm:w-1/2 md:w-1/4 border-2 border-red p-4 my-3 md:my-5 mx-3">
              <Link >
                <div className="bg-slate-100 p-3 ">
                  <img src={category.image} className="w-[500px] h-[400px] " alt={category.name} />
                  <h3 className="text-green-700 mt-3 text-center text-2xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
