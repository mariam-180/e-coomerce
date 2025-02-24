import Slider from "react-slick";
import bag1 from "./../../assets/Images/bag1.jpg"
import bag2 from "./../../assets/Images/bag2.jpg"
import guitar from "./../../assets/Images/guitar.jpg"
import chair from "./../../assets/Images/chair.jpg"
export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:3000,
    };
    return (
        <section className="py-7 mb-5 container mx-auto">
            <div className="flex flex-wrap justify-center items-center">
                <div className=" w-1/3">
                    <Slider {...settings}>
                      <div className=" w-[300px]">
                        <img src={bag1} className=" h-[400px] w-full" alt=""/>
                      </div>
                      <div>
                        <img src={chair} className=" h-[250px] w-full" alt=""/>
                      </div>
                    
                    </Slider>  
                </div>

                <div className="w-1/3">
                <div>
                        <img src={bag2} className=" h-[300px] w-full" alt=""/>
                      </div>
                      <div>
                        <img src={guitar} className=" h-[300px] w-full" alt=""/>
                      </div>
                </div> 


            </div>

        </section>
    );
}