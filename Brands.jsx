import axios from "axios";
import { useEffect, useState } from "react";

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function getAllBrands() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
            setBrands(data.data);
        } catch (error) {
            console.log("Error fetching brands:", error);
        }
    }

    async function getSpecificBrand(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
            setSelectedBrand(data.data);
        } catch (error) {
            console.log("Error fetching specific brand:", error);
        }
    }

    const handleOpenModal = (brandId) => {
        getSpecificBrand(brandId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedBrand(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        getAllBrands();
    }, []);

    return (
        <>
            {/* Brands List */}
            <div className="md:w-[90%] py-10 mx-auto">
                <div className="flex flex-wrap justify-center items-center py-10">
                    {brands.map((brand, idx) => (
                        <div
                            key={idx}
                            className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 border-2 border-slate-200 p-4 my-3 md:my-5 mx-3 cursor-pointer"
                            onClick={() => handleOpenModal(brand._id)}
                        >
                            <div className="w-full">
                                <img
                                    src={brand.image}
                                    className="w-full h-[100px] object-contain"
                                    alt={brand.name}
                                />
                                <h3 className="text-green-700 mt-3 text-center text-lg font-semibold">
                                    {brand.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main modal */}
            {isModalOpen && (
                <div
                    id="default-modal"
                    className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {selectedBrand ? selectedBrand.name : "Brand Details"}
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg flex items-center justify-center w-8 h-8"
                                    onClick={handleCloseModal}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="p-4 space-y-4">
                                {selectedBrand && (
                                    <>
                                        <img
                                            src={selectedBrand.image}
                                            alt={selectedBrand.name}
                                            className="w-full h-[100px] object-contain mb-4"
                                        />
                                        <p className="text-base leading-relaxed text-gray-500">
                                            {selectedBrand.name}
                                        </p>
                                    </>
                                )}
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center p-4 border-t">
                                <button
                                    type="button"
                                    className="text-white ms-auto bg-gray-500 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Brands;
