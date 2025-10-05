
"use client"
import { ProductI } from "@/interfaces";
import Image from "next/image";
import React from "react";

import Slider from "react-slick";

interface ProductSliderProps {
  product?: ProductI; // ممكن يكون undefined
}
export default function ProductSlider({product}:ProductSliderProps) {

    const images: string[] = product?.images ?? [];
    console.log(images);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
  };
  return (
   
    <Slider {...settings}>
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={image} className="rounded-2xl">
            <Image
              src={image}
              alt={`Product image ${index}`}
              width={700}
              height={700}
              
              className="w-full h-96 object-cover"
            />
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
    </Slider>
   
  );
}