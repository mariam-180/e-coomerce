import { useQuery } from "@tanstack/react-query";
import React from "react";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  async function getAllCategory() {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    console.log("API Response:", response.data); // Debugging
    return response.data.data; // ✅ Return only the array of categories
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    
  };

  return (
    <div className="py-6">
      <Slider {...settings}>
        {data?.map((category, idx) => (
          <div key={idx} className="p-2">
            <img src={category.image} className="w-full h-[200px] object-cover rounded-md" alt={category.name} />
            <h3 className="text-center mt-2 text-2xl font-semibold">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
