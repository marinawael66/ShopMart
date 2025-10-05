
"use client"
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

function MainSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:1800,
    };
    return (
        <div className="grid grid-cols-12  ">
           <div className="col-span-10  ">
               <Slider className="w-full" {...settings}>
                    <div>
                        <Image src={'/images/back to school.jpg'} alt={"men clothing"} width={1000} height={1000} quality={95} className=" w-full h-96 object-cover " />
                    </div>

                    <div>
                        <Image src={'/images/skincare.jpg'} alt={"skincare"} width={2000} height={2000} quality={95} className="w-full h-96 object-cover  object-top" />
                    </div>



                    <div>
                        <Image src={'/images/shopping1.webp'} alt={"men clothing"} width={1000} height={1000} quality={95} className="  w-full h-96 object-cover object-top" />
                    </div>

                </Slider>
           </div>
             
           
         <div className="col-span-2 h-92"> 
                 <div>
                    <Image src={'/images/back to school2.jpg'} alt={"supplies"} width={1000} height={1000} quality={95} className=" w-full h-50 object-cover object-top" />
                </div>

                <div>
                    <Image src={'/images/iphone.jpg'} alt={"tech products"} width={200} height={200} quality={95} className="w-full h-50 object-cover object-top" />
                </div>
            </div>

        </div>
    );
}

export default MainSlider;
